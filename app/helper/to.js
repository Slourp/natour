/**
 * @param { Promise } promise
 * @param { Object } improved - If you need to enhance the error.
 * @return { Promise }
 * @exemple const [error, result] = await to(someAsyncData());
 */
const to = (promise, improved) => promise
    .then((data) => [null, data])
    .catch((err) =>
        (improved) ? Object.assign(err, improved) : [err]
    );


export default to