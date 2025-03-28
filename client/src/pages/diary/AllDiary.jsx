import CreateDiary from '../../components/diary/CreateDiary';
import ListAll from '../../components/diary/ListAll';

const AllDiary = () => {

     return (
          <>
               {/* Diary List */}
               <ListAll />
               {/* Create Diary Note */}
               <CreateDiary />
          </>
     );
};

export default AllDiary;