
//destructuring assignment
//	Giúp xây dựng HTML một cách gọn gàng và có thể nhúng giá trị dễ dàng.
export default function html([first, ...strings], ...values){
    //reduce là một phương thức của mảng (Array) cho phép bạn chuyển đổi một mảng thành một giá trị duy nhất thông qua việc áp dụng một hàm callback lên từng phần tử của mảng.
    return values.reduce(
        // acc là biến tích trữ
        (acc, cur) => acc.concat(cur, strings.shift()),
        // mảng khởi tạo chứa phần tử đầu tiên của mảng strings.
        [first]
    )
    // filter là lọc 
    .filter(x => x && x !== true || x === 0)
    .join('')
}

// console.log(
//   html(["Hi ", ",welcome", "!"], "Đoan", "back")
// )




// REDUCER LÀ CALLBACK
//createStore: là một store (kho chứa dữ liệu) dùng để quản lý và cập nhật trạng thái (state) của ứng dụng.
export function createStore(reducer){
 
    //Gọi reducer() không có tham số, để lấy state khởi tạo mặc định.
    // Giúp hệ thống biết trạng thái ban đầu của ứng dụng là gì (ví dụ: { count: 0 }, { todos: [] }, v.v.).
    let state = reducer()

    // TẠO ROOT
    const roots = new Map()

    // hàm render
    function render(){
        // Duyệt qua mỗi component đã được attach, lấy kết quả HTML từ component() rồi gán vào root.innerHTML.
        for(const [root, component] of roots){
            const output = component()
            root.innerHTML = output
        }
    }

    return {

        // 	Gắn component vào DOM và render.
        attach(component, root){
            roots.set(root, component)
            render()
        },

        // đẩy store vào wiew
        // 	Truyền state từ store vào component.
        //selector dùng để chọn phần state mà component cần.
        //Trả về một component mới có props gồm:
           //1) props ban đầu
           //2) state được chọn từ selector
        connect(selector = state => state){
            return component => (props, ...args) =>
                component(Object.assign({},props,selector(state), ...args))
        },

        // 	Cập nhật state dựa trên action và render lại UI.
        // view muốn thực hiện lại action thì p dispatch
        dispatch(action, ...args){
            state = reducer(state, action, args)
            render()
        }
    }
}