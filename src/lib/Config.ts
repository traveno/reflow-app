import { BaseDirectory, exists, readTextFile } from "@tauri-apps/api/fs";

export function configExists() {
    return exists('reflow.json', { dir: BaseDirectory.AppConfig });
}