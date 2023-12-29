import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { IAddFishFarmData } from './stepperComponent';
import { useWorker } from '../hooks/worker';
import { useQuery } from 'react-query';
import { workers } from '../utils/constants';
import { KeySharp } from '@mui/icons-material';
import { useState } from 'react';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 260 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  { field: 'position', headerName: 'Position', width: 130 },
  { field: 'picture', headerName: 'Picture', width: 130 }
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