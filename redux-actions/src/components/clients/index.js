import { makeStyles } from "@material-ui/core/styles";
import React , {useEffect} from "react";
import ClientForm from 'components/clients/ClientForm';
import ClientCard from 'components/clients/ClientCard';
import { List, ListItem, Fab, CardActions } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root:{
    },
    clientList:{
        width: "100%"
    },
    actions:{
        display: 'flex',
        padding: '8px',
        flex: '1',
        alignItems: 'flex-end',
        position: 'sticky',
        bottom: '0px',    
        background: 'white',
    },
    fab:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',  
        "& button":{boxShadow: "none"}
    }
}))

export default function (props){
    const classes = useStyles();
    const {
        selectedClient,
        clients,
        updateClients
    } = props;
    const [client, setClient] = React.useState(selectedClient || {});
    const [showForm, setShowForm] = React.useState(selectedClient?false:true);
    const [list, setList] = React.useState(clients || []);

    useEffect(()=>{
        setClient(selectedClient || {});
        setShowForm(selectedClient?false:true);
        setList(clients || []);
    }, [clients])

    const handlerSubmitClientForm = (data) =>{
        let newList, client ;
        if(!data.idcli){
            newList = list.filter((o, i) => {o.selected = false; return true});
            client = {
                ...data, 
                idcli: list.length + 1,
                selected: true
            };
            newList = [client, ...newList];
        } else {
            newList =  [...list];
            let index = newList.findIndex((e) => e.idcli === data.idcli);
            client = newList[index] = data;
        }
        setList(newList);
        setClient(client);
        setShowForm(false);
        updateClients && updateClients(newList);
    }
    const handlerClickEdit = (data) =>{
        setClient(data);
        setShowForm(true);
    }
    const handlerClickDelete = (data) =>{
        let newList = list.filter((o, i) => o.idcli !== data.idcli);
        newList.length > 0 && (newList[0].selected = true);
        setList(newList);
        if(newList.length <= 0){
            setClient({});
            setShowForm(true);
        }
        updateClients && updateClients(newList);
    }
    const handlerClickAdd = (data) =>{
        setClient({});
        setShowForm(true);  
    }

    const handlerSelection = (data) =>{
        let newList = list.map((o) => ({...o, selected: data.idcli == o.idcli}) );
        setList(newList);        
        updateClients && updateClients(newList);
    }

    const handleBackClick = () =>{
        setClient({});
        setShowForm(false);  
    }

    return (
        <>
            {showForm && <ClientForm onSubmitClientForm={handlerSubmitClientForm} data={client} onClickBack={handleBackClick} showBack={list && list.length > 0}/> }
            {!showForm &&  
                <>
                    <List disablePadding className={classes.clientList}>
                        {list.map(c => <ListItem key={"client-"+c.idcli}>
                            <ClientCard data={c} onClickEdit={handlerClickEdit} onClickDelete={handlerClickDelete} onSelection={handlerSelection}/>
                        </ListItem>)}
                    </List>
                    {props.showAdd &&
                        <CardActions disableSpacing className={classes.actions}>
                            <div className={classes.fab}>
                                <Fab color="primary" onClick={handlerClickAdd}>
                                    <AddIcon />
                                </Fab>
                            </div>
                        </CardActions>
                    }
                </>
            }
        </>
    )
}
