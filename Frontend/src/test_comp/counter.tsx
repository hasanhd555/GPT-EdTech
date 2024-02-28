import { useAppDispatch, useAppSelector } from '../redux/hooks/index';
import { increment, decrement } from "../redux/slices/counter";

const Counter:React.FC =()=> {
    const count = useAppSelector((state) => state.counter);
    const dispatch = useAppDispatch();

    return (
      <div>
        COUNT:{count}
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    );
  }
  
  export default Counter;
  