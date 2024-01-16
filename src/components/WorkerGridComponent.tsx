import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { fishfarms, positionEnumMap, workers } from '../utils/constants';
import { useFishfarm } from '../hooks/fishfarm';
import { useQuery } from 'react-query';
import { useWorker } from '../hooks/worker';
import { IFishFarmData } from './DialogBoxComponent';
import { useParams } from 'react-router-dom';

interface ItemProp {
    id: number,
    name: string,
    email: string,
    age: number,
    position: number,
    fishFarmId: number

}
const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    { field: 'position', headerName: 'Position', width: 130, valueGetter: (params) => positionEnumMap[params.value as number] }
];
type FishFarmWorker = {
    fishFarmWorker : IFishFarmData,
    fishFarmId : number
    setFishFarmWorker : (props : IFishFarmData) => void
}

export default function DataGridDemo({fishFarmId,fishFarmWorker, setFishFarmWorker} : FishFarmWorker) {
    const { handleGetFishFarmWorkers } = useFishfarm()
    const { handleGetIdleWorkers } = useWorker()
    const {clientId} = useParams()
    const { data: IdleWorkers, isLoading : idleWorkerLoading } = useQuery(workers, () => handleGetIdleWorkers(Number(clientId)));
    // console.log({IdleWorkers})
    const { data: CurrentWorkers, isLoading : currentWorkerLoading } = useQuery(fishfarms, () => handleGetFishFarmWorkers(fishFarmId))

    React.useEffect(() => {
        const ids = (CurrentWorkers?.data)?.map((item: ItemProp) => item['id'])
        setFishFarmWorker({...fishFarmWorker,workersIdList : ids})
    }, [CurrentWorkers])

    if (idleWorkerLoading || currentWorkerLoading) {
        return (
            <h1>Loading..</h1>
        )
    }
    const rows = (CurrentWorkers?.data).concat(IdleWorkers?.data);
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                rowSelectionModel={fishFarmWorker.workersIdList as GridRowSelectionModel}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    setFishFarmWorker({...fishFarmWorker,fishfarmId : fishFarmId})
                    setFishFarmWorker({...fishFarmWorker,workersIdList : ids as number[]})
                }}
            />
        </Box>
    );
}