##Facade(门面模式)
门面模式有两个作用：一是简化类的接口；二是消除类与使用它的客户之间的耦合。

##实用场合
判断是否应该应用门面模式的关键在于辨认反复成组出现的代码。如果函数b出现在函数a之后这种情况经常出现，因此可以添加一个把这两个函数组合起来的门面。

##好处
反复使用，降低对外部代码的依赖度

##坏处
不要小题大做，应该根据代码的实用性来判断。有时相比一个复杂的门面函数，其组成函数在粒度方面更有吸引力，因为门面函数会执行不必要的功能。