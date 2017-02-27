/**
 * Created by xulingming on 2017/2/27.
 */
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

var TagSchema = new mongoose.Schema({
  tag: String
});

TagSchema.plugin(mongoosePaginate);
export default mongoose.model('Tag', TagSchema);
