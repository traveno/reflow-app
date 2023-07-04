import { Center, CycleRaycast, Line, useHelper } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { LineGeometry, LineSegments2, LineSegmentsGeometry } from 'three-stdlib';

function process(textData: string) {
    const gcodeLines = textData.split('\n').filter(l => l.startsWith('G1'));
    const gcodeLinesDebug = [];
    const points: [number, number, number][] = [];
    const colors: [number, number, number][] = [];
    let estimatedTime = 0; // in seconds

    console.log(gcodeLines);

    let xStart = 0, yStart = 0, zStart = 0, feed = 0;

    for (let gcode of gcodeLines) {
        const args = gcode.split(" ");
        const xEnd = Number(args.find(a => a.startsWith('X'))?.slice(1) ?? xStart);
        const yEnd = Number(args.find(a => a.startsWith('Y'))?.slice(1) ?? yStart);
        const zEnd = Number(args.find(a => a.startsWith('Z'))?.slice(1) ?? zStart);

        feed = Number(args.find(a => a.startsWith('F'))?.slice(1) ?? feed);

        if (xStart !== 0 && yStart !== 0 && zStart !== 0) {
            const start = new THREE.Vector3(xStart, yStart, zStart)
            const end = new THREE.Vector3(xEnd, yEnd, zEnd);

            points.push([xStart, yStart, zStart]);
            points.push([xEnd, yEnd, zEnd]);

            estimatedTime += start.distanceTo(end) / feed / 60;

            if (_isExtrudeMove(gcode)) {
                const extrude = Number(args.find(a => a.startsWith('E'))!.slice(1));
                const distance = start.distanceTo(end);
                const speed = feed / 60; // mm per second
                const nozzleDiameter = 0.4;
                const volumetricFlow = nozzleDiameter * 0.2 * 1 * distance / (distance / speed);

                const volumetricScale = volumetricFlow / 20;

                gcodeLinesDebug.push(`${gcode} // ${volumetricFlow}mm3/s`);

                const volumetricColor = new THREE.Color('#3333ff').lerp(new THREE.Color('#ff0000'), Math.min(volumetricScale, 1));
                
                colors.push([...volumetricColor.toArray()] as [number, number, number]);
                colors.push([...volumetricColor.toArray()] as [number, number, number]);
            } else {
                colors.push([0, 1, 0]);
                colors.push([0, 1, 0]);
            }
        }

        xStart = xEnd;
        yStart = yEnd;
        zStart = zEnd;
    }

    // console.log(colors.filter(c => c[0] > 0.5));
    console.log(gcodeLinesDebug);
    console.log(estimatedTime / 60, "minutes to print");

    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    // geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // geometry.computeBoundingBox();
    // const geometrySize = new THREE.Vector3();
    // const geometryCenter = new THREE.Vector3();
    // geometry.boundingBox?.getSize(geometrySize);
    // geometry.boundingBox?.getCenter(geometryCenter);
    // const largestAxis = Math.max(geometrySize.x, geometrySize.y, geometrySize.z);
    // const scaleFactor = 10 / largestAxis;
    
    // geometry.translate(-geometryCenter.x, -geometryCenter.y, 0);
    // geometry.scale(scaleFactor, scaleFactor, scaleFactor);

    return {
        points,
        colors
    }
}

function _isExtrudeMove(gcode: string): boolean {
    const args = gcode.split(" ");
    return args.find(a => a.startsWith('E')) ? true : false
}

function GCode(props: { key: string, textData: string }) {
    const { points, colors } = process(props.textData);

    const mesh = useRef<LineSegments2>(null!);
    // useHelper(mesh, THREE.BoxHelper, 'red');

    useEffect(() => {
        mesh.current.geometry.computeBoundingBox();
        mesh.current.geometry.computeBoundingSphere();

        // Get max dimension
        const size = new THREE.Vector3();
        mesh.current.geometry.boundingBox!.getSize(size);
        const scaleFactor = 10 / Math.max(...size.toArray());

        // Normalize to 10 units
        // mesh.current.scale.multiplyScalar(scaleFactor);
        mesh.current.geometry.scale(scaleFactor, scaleFactor, scaleFactor);

        // mesh.current.updateMatrix();
        // mesh.current.updateMatrixWorld(true);

        // Get origin
        mesh.current.geometry.computeBoundingBox();
        const origin = new THREE.Vector3();
        mesh.current.geometry.boundingBox!.getCenter(origin);

        // Move to center of scene
        // mesh.current.position.copy(origin.multiplyScalar(-1));
        mesh.current.geometry.translate(-origin.x, -origin.y, 0);

        mesh.current.geometry.setDrawRange(0, 300);
    }, [mesh])

    return (
        <Line
            ref={mesh}
            color="white"
            segments={true}
            points={points}
            vertexColors={colors}
            position={[0, 0, 0]}
            lineWidth={3}
            
        />
    );
}

function setLineColor(event: ThreeEvent<PointerEvent>) {
    if (event.intersections[0]) {
        const object = event.intersections[0].object as LineSegments2;
        object.geometry.attributes['instanceColorStart'].setXYZ(event.intersections[0].faceIndex!, 1, 1, 1);
        object.geometry.attributes['instanceColorEnd'].setXYZ(event.intersections[0].faceIndex!, 1, 1, 1);
        object.geometry.attributes['instanceColorStart'].needsUpdate = true;
        object.geometry.attributes['instanceColorEnd'].needsUpdate = true;
    }
}

export default GCode;