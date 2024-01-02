import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { OuterFrame } from '../components/OuterFrameComponent';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useClient } from '../hooks/client';
import { useQuery } from 'react-query';
import { admins, clients } from '../utils/constants';
import FormDialog from '../components/AddClientDialogComponent';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { useAdmin } from '../hooks/admin';

export interface User {
    id : number,
    name : string
}
export default function AdminTable() {
    const [ open, setOpen] = useState(false)
    const { handleGetUsers } = useAdmin()
    const navigate = useNavigate();
    const { data, isLoading,isError, error } = useQuery(admins, handleGetUsers);

    const handleAdd = () => {
        navigate('/adminView/addAdminForm')
    }
    
    return (
        <OuterFrame>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
            >
                System admins
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">
                                <Button 
                                style={{ justifyItems: 'right' }} 
                                variant="contained"
                                onClick={handleAdd}>
                                    Add Admin
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data.map((admin : User) => (
                            <TableRow
                                key={admin.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{admin.name}</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </OuterFrame>
    );
}