import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore } from './store';
import { dataURLToBlob, blobToArrayBuffer } from './helpers';

/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [location of file we want to upload]
 * @param  {String}   name    [name of the file]
 * @param  {Function} resolve [callback function that would be invoked upon successful upload]
 * @param  {Function} reject  [callback that will be invoked on upload error]
 */
export function upload(dataUrl, name, resolve, reject) {
    // convert to Blob
    const blob = dataURLToBlob(dataUrl);
    blob.name = name;

    // pick from an object only: name, type and size
    const file = _.pick(blob, 'name', 'type', 'size');

    // convert to ArrayBuffer
    blobToArrayBuffer(blob, (data) => {
        const upload = new UploadFS.Uploader({
            data,
            file,
            store: ImagesStore,
            onError: reject,
            onComplete: resolve
        });

        upload.start();
    }, reject);
}