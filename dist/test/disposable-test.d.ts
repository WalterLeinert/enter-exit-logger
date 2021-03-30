import { Disposable } from '../lib/disposable';
/**
 * Test for disposable pattern
 */
export declare class Camera extends Disposable {
    manufacturer: string;
    model: string;
    constructor(manufacturer: string, model: string);
    takePicture(): void;
    protected onDispose(): void;
}
