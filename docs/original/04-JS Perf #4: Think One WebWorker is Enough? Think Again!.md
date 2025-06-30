# JS Perf #4: Think One WebWorker is Enough? Think Again!

Discover how multiple WebWorkers can unlock actual performance gains!

![04-01](./assets/04-01.webp)

You know about WebWorker, right? If not, here’s a quick refresher:

Imagine you have an animation running smoothly. Now, let’s say you trigger a heavy computation with a button click. This is what happens:

![04-02](./assets/04-02.gif)

Of course, if we use a WebWorker, we can offload the heavy computation to a separate thread, preventing the animation from stuttering:

![04-03](./assets/04-03.gif)

But there’s still a problem — the computation still takes a long time! Sure, the experience is better, but it’s far from optimal.

Can we actually speed up execution time? In many cases, yes!

## The Problem with a Single WebWorker

A WebWorker allows us to offload work from the main thread, but it still runs as a single thread. This means that if we have a heavy computation, a single WebWorker will handle it synchronously—just like the main thread would—except without blocking the UI. It doesn’t actually make the calculation itself faster.

What’s worse, many people don’t realize this, but WebWorker is usually slower than the main thread. It gets fewer resources than the main thread, and when you factor in the overhead of passing messages back and forth, you’ll often see an average 20% slowdown when running the same code inside a WebWorker.

But wait… are we limited to just one WebWorker? The good news is, No!

So why not take advantage of that? If we split the workload across multiple WebWorker, we can utilize multiple CPU cores and significantly improve performance!

## Example: Speeding Up Heavy Computation with Multiple WebWorkers

Let’s consider a scenario in which we have a large dataset and need to apply a computationally expensive transformation to each element using a map(). Instead of processing the entire array sequentially in one WebWorker, we can split the data into chunks and distribute them across multiple WebWorker instances.

This is the code I’d run in the attached video above, which took almost 6 seconds to execute:

```js
const array = YOUR_ARRAY_HERE;
const worker = new Worker('YOUR_WORKER_PATH.js');

worker.postMessage(array);
worker.onmessage = event => doSomething(event.data);
```

This works but is still sequential — one WebWorker handling everything alone.

## Multi-WebWorker Solution (Better!)

But what if we split the work into multiple instances of WebWorker instead of processing everything sequentially?

This should look something like this:

```js
const array = YOUR_ARRAY_HERE;

// Prerequisites for parallel processing
const workersCount = HOW_MANY_WORKERS_YOU_WANT;
const chunkSize = Math.ceil(array.length / workersCount);

// Create promises for each worker and chunk
const workerPromises = Array.from({ length: workersCount }, (_, index) => 
  new Promise(resolve => {
    const worker = new Worker('YOUR_WORKER_PATH.js');
    const chunkStartIndex = index * chunkSize;
    const chunkEndIndex = chunkStartIndex + chunkSize;
    const chunk = array.slice(chunkStartIndex, chunkEndIndex);

    worker.onmessage = event => resolve(event.data);
    worker.postMessage(chunk);
  }));

// Wait for all workers to finish and collect results
const chunks = await Promise.all(workerPromises);
const result = chunks.flat();

doSomething(result);
```

Each one processes only its assigned chunk, taking full advantage of multi-core CPUs.

The result? Massive performance gains! 🚀

![04-04](./assets/04-04.gif)

## But Wait… More Workers = Better Performance?

It sounds tempting to just keep adding more WebWorker instances, but that’s actually a mistake!

Managing threads isn’t free — the platform needs to allocate resources and handle communication between them. This means there’s an optimal number of workers you shouldn’t exceed.

A good rule of thumb? One WebWorker per CPU core:


```js
const workersCount = Math.min(navigator.hardwareConcurrency, YOUR_REASONABLE_LIMIT);
```

Let’s see what happens if we use 5× more instances of WebWorker than cores (14 cores, in my case):

![04-05](./assets/04-04.gif)

The result? 30% worse performance! Adding too many workers leads to overhead that outweighs the benefits.

## When Does This Approach Work?

Unfortunately, not all computations can be parallelized. This method works best when tasks can be split into independent parts, such as:

✅ Image processing (e.g., converting a color image to grayscale, where each chunk processes a different section)

✅ Text searching (e.g., finding all occurrences of a substring in a massive text file, where each chunk scans a separate portion)

✅ Batch computations (e.g., simulations, number crunching, or dataset transformations that don’t depend on each other)

## And When Does It Not Work?

❌ When each part of the computation depends on another part (e.g., computing Fibonacci numbers recursively, where later calculations rely on previous ones)

❌ When the overhead of splitting and recombining data outweighs the performance gain.

## Conclusion

- A single WebWorker doesn’t speed up execution time — it only prevents UI blocking.
- Using multiple WebWorker instances can unlock significant performance improvements by leveraging parallelism.
- Too many instnaces of WebWorker can backfire — stick to roughly one per CPU core for best results.




## Original Text

[JS Perf #4: Think One WebWorker is Enough? Think Again!](https://itnext.io/js-perf-4-think-one-webworker-is-enough-think-again-61bbbab65a6b)