import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { IAddFishFarmData } from './stepperComponent';
import { useWorker } from '../hooks/worker';
import { useQuery } from 'react-query';
import { positionEnumMap, workers } from '../utils/constants';
import { url } from 'inspector';

const ImageRetrieveInTable = (imagePath : string) => {
  return(
    <img style={{borderRadius : '50%',height : 40, width : 40,alignSelf : 'center'}}  src={imagePath}/>
  )
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  // { field: 'picture', headerName: 'Picture', width: 130, valueSetter : (params) => ImageRetrieveInTable(params.value as string) },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 260 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'position', headerName: 'Position', width: 130, valueGetter : (params) => positionEnumMap[params.value as number] }  
];


type AddWorkerProps = {
  formData: IAddFishFarmData
  setFormData: (props: IAddFishFarmData) => void
}

export default function AddWorkersStepTable({ formData, setFormData }: AddWorkerProps) {
  const { handleGetWorker } = useWorker();
  const { data, isLoading, error } = useQuery(workers, handleGetWorker);
  console.log({ data, isLoading, error })
   if (isLoading){
    return(
      <h1>Loading</h1>
    )
   }

  return (
    
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data?.data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={formData.workersIdList as GridRowSelectionModel}
        onRowSelectionModelChange={(ids) => {
          setFormData({ ...formData, workersIdList: ids as number[] })
          console.log(ids)
        }}
      />
    </div>
      
  );
}