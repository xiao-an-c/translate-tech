# JS性能优化（4）：单个Web Worker已足够？再想想！

探索如何通过多个Web Worker实现真实的性能提升！

![04-01](./assets/04-01.webp)

您知道Web Worker吗？若还不熟悉，这里有个快速回顾：

假设您有一个流畅运行动画的界面。此时通过按钮触发大量计算，将出现以下情况：

![04-02](./assets/04-02.gif)

如果使用Web Worker，我们可以将繁重的计算任务转移至独立线程，从而避免动画卡顿：

![04-03](./assets/04-03.gif)

但仍存在根本问题——计算过程本身仍耗时较长！虽然交互体验有所改善，但远未达到最优效果。

能否真正缩短执行时间？多数情况下确实可行！

## 单个Web Worker的局限性

Web Worker虽然能将任务分流至主线程之外，但其自身仍以单线程模式运行。这意味着面对需要密集计算的任务时，单个Web Worker将以同步方式串行处理——虽不会阻塞UI，但计算速度与主线程无异。

更值得注意的是，Web Worker的运行效率通常低于主线程。由于其分配到的资源更少，加上跨线程通信的开销，当同一份代码在Web Worker中运行时，普遍会出现平均20%的性能下降。

但问题是，我们是否只能使用一个Web Worker？好消息是并非如此！

因此，何不充分利用这一特性？通过将工作量分配给多个Web Worker，我们可以激活多核CPU的并行处理能力，显著提升处理速度。

## 示例：多个Web Worker加速密集型计算

假设需对大规模数据集执行高计算负荷的map()变换。此时，与其在单个Web Worker中顺序处理整组数组，不如将数据分块并行分配给多个Web Worker实例处理：

上方视频中运行的代码执行耗时近6秒：

```js
const array = YOUR_ARRAY_HERE;
const worker = new Worker('YOUR_WORKER_PATH.js');

worker.postMessage(array);
worker.onmessage = event => doSomething(event.data);
```

此方案虽有效，但处理方式仍为串行——单个Web Worker独立承担全部工作。

## 多Web Worker解决方案（更优选择）

如果将计算任务拆解到多个Web Worker实例而非顺序处理，会发生什么？

改进后的逻辑大致如下：

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

每个Web Worker仅处理其分配的数据块，充分释放多核CPU性能。

结果如何？呈现性能突跃式提升！🚀

![04-04](./assets/04-04.gif)

## 但请注意：Web Worker数量越多越好吗？

持续增加Web Worker实例看似诱人，实则适得其反！

线程管理并非零开销——系统需为每个线程分配资源并处理通信。因此存在不应突破的最佳Worker数量阈值。

一个经验法则是：每个CPU核心对应一个Web Worker。

```js
const workersCount = Math.min(navigator.hardwareConcurrency, YOUR_REASONABLE_LIMIT);
```

以笔者的14核CPU为例，当Web Worker实例数超核心数5倍时：

![04-05](./assets/04-05.gif)

结果如何？性能反而下降30%！过多的Web Worker实例会产生超额管理开销，吞噬并行带来的优势。

## 适用场景

但需注意，并非所有计算都可被并行化。此方法在任务可分拆为独立单元时表现最佳，例如：

✅ 图像处理（如将彩色图像灰度化处理，各数据块处理不同区域）

✅ 文本检索（如在海量文本中查找子串出现位置，各数据块扫描独立区段）

✅ 批量计算（如模拟运算、数值计算或彼此无依赖性的数据集转换）

## 不适用场景

❌ 计算存在顺序依赖性（如递归计算斐波那契数列，后续计算依赖前序结果）

❌ 数据拆分与重组开销超过性能增益

## 结论总结

* 单个Web Worker无法缩短执行时间——其作用仅为防止UI阻塞。
* 通过多个Web Worker实例的并行处理，可实现显著的性能提升。
* 过多的Web Worker实例将引发反效果——按CPU核心数配置Web Worker数量是较优策略。

## 原文参考

[04-JS Perf #4: Think One WebWorker is Enough? Think Again!](https://itnext.io/js-perf-4-think-one-webworker-is-enough-think-again-61bbbab65a6b)