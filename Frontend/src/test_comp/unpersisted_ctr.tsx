import { useAppDispatch, useAppSelector } from '../redux/hooks/index';
import { increment, decrement } from "../redux/slices/unpersisted_counter";

const Unpersisted_Counter:React.FC =()=> {
    const count = useAppSelector((state) => state.Unpersisted_counter);
    const dispatch = useAppDispatch();

    return (
      <div>
        COUNT:{count}
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
    );
  }
  
  export default Unpersisted_Counter;
  