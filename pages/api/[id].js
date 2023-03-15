import {deleteExercise} from '../../../controller/exercise'
import connectDb from '@/middleware/mongoose'

const handler= async (req, res) => {
    const { method } = req;
    switch (method) {
        case 'DELETE':
            deleteExercise(req, res);
            break;
        // case 'PATCH':
        //     updateExercise(req, res);
        //     break;
        // case 'GET':
        //     getExercise(req, res);
        //     break;
        // default:
        //     res.send({ status: false, message: 'wrong request' });
        //     break;
    }
}
export default connectDb(handler)