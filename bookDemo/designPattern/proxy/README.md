##proxy(代理模式)
代理模式是一个对象,它可以用来控制对另一个对象的访问.它与另一个对象实现了同一个接口,并且把任何方法调用传递给那个对象.另外那个对象
通常称为<strong>本体</strong>(real subject)。代理可以代替其本体被实例化,,并使其可被远程访问。它还可以将本体的实例化推迟到
真正需要的时候,对于实例化比较费时的本体,或者因为尺寸较大以至于不用时不宜保存在内存中的本体。

###代理模式结构
代理模式最基本的形式就是对访问进行控制。代理对象和本体实现的是同一个接口.实际上工作还是本体在做，代理对象所做的是不外乎节制对本体的访问,
要注意:<strong>代理对象并不会在另一个对象的基础上添加属性和方法或者修改其方法(像装饰者).也不会简化那个对象的接口(像门面),它实现的
接口与本体完全相同</strong>。