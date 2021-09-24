function findSoBase_func() //寻找so基地址
{

/*------需要hook的so名------*/
var str_libil2cpp_so="libil2cpp.so";

/*------定义libil2cpp.so模组------*/
    //var md_libil2cpp_so=Process.getModuleByName(str_libil2cpp_so);
var md_libil2cpp_so=Process.findModuleByName(str_libil2cpp_so);

/*------寻找so基地址------*/
    //var addr_libil2cpp_base=Module.findBaseAddress(str_libil2cpp_so);   //寻找so基地址方法1
    //var addr_libil2cpp_base=Module.getBaseAddress(str_libil2cpp_so);    //寻找so基地址方法2
var baseaddr_libil2cpp_so=md_libil2cpp_so.base;
console.log(str_libil2cpp_so+"的基地址------"+baseaddr_libil2cpp_so);
}
setImmediate(findSoBase_func,0);

function store_func()  //需要hook的全部函数仓库及最终内存地址
{
/*------需要hook的函数，通过Excel批量获取------*/
//var offset_name="0x123456789";  //函数【偏移地址】
var finaladdr_name=baseaddr_libil2cpp_so.add(offset_name);  //函数【内存地址】

}

function hook_func() //通过Interceptor.attach();方法hook函数
{
	Interceptor.attach(base_func,
		{			
			onEnter: function (args)
			{
				console.log("hook on enter no exp");
				//修改参数：args[1]=ptr(10000);args[n]代表第n个参数，ptr（）括号内为参数值
                // send(args[0].toInt32());
                
                 //调用另一个函数
                 call_func(storefor_call_func.func1);
               
			},
			onLeave: function (retval) {

                console.log("hook on Leave no exp");

                //修改函数返回值用：【1】retval.replace(100000000)【2】retval.replace(ptr("0x1234)  pointer
                // send(retval.toInt32());
			}
		});

}

function storefor_call_func()   //存储已经定义待被调用的函数
{
    /*u3d中定义【有参数】的函数*/
    var func1 = new NativeFunction(addr1,'void',['int']); //【可用】0x8794E8---void AddCampStars(int numStars)
    var func2 = new NativeFunction(addr1,'pointer',['int']); //【可用】0x8794E8---void AddCampStars(int numStars)
    /*u3d中定义定义【参数为空】的函数*/
    var func3 = new NativeFunction(final_addr,'void',[]); 
}




function call_func(func)
{
    /*u3d中定义调用方法*/
    func.apply(func,[]); //无参数： Offset = "0x878894" public static void DiscoverAll()
    func.apply(func,[1,2,3,4]);//有参数
}