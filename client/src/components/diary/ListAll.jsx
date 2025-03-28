import DiaryEntry from '../../components/diary/DiaryEntry';

const ListAll = () => {
     return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 container">
               <DiaryEntry entry={'text'} />
               <DiaryEntry entry={'audio'} />
               <DiaryEntry entry={'audio'} />
          </div>
     )
}

export default ListAll
