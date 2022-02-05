import { CREATE_COLECTIONS, DELETE_COLECTIONS, EDIT_COLECTIONS, SHOW_COLECTIONS, READ_COLLECTIONS, SET_TRUE_FLAG,
    SET_FALSE_FLAG,SET_ID_ITHEM, ADD_NEW_ITHEM, READ_ITHEMS, DELETE_ITHEM, ADD_NEW_TAG,READ_TEGS, DELECTE_TAG, CREATE_NAME_COLLECTIONS,
    READ_NAME_COLECTIONS, SET_KEY_ITHEMS,LIKED,READ_LIKE,DISLIKE,CREATE_COMENT,READ_COMMENT,UPLOAD_PICTURES,SEARCH_ITHEM,SEARCH_ITHEM_EMPTY,
    CLOSE_SEARCH} from "./types";

const initialState = {
    colections:[],
    keyID:[],
    flag:false,
    collectionsKeyId:'',
    ithems:[],
    tags:[],
    nameCollections: [],
    keyIdIthems:'',
    like:[],
    comment:[],
    pictures:[],
    search:[]
}

export const colectionsReducer = (state = initialState, action) =>{
    switch(action.type){
        case SHOW_COLECTIONS: return{...state, keyID: action.payload}
        case CREATE_COLECTIONS: return{...state, colections: state.colections.concat(action.payload)}
        case DELETE_COLECTIONS: return{...state, colections: state.colections.filter(data => data.keyID !== action.payload)}
        case EDIT_COLECTIONS: return{}
        case READ_COLLECTIONS: return{...state, colections:action.payload}
        case SET_TRUE_FLAG: return{...state, flag:true, collectionsData: action.payload }
        case SET_FALSE_FLAG: return{...state, flag:false}
        case SET_ID_ITHEM: return {...state, collectionsKeyId: action.payload}
        case ADD_NEW_ITHEM: return{...state, ithems: state.ithems.concat(action.payload)}
        case READ_ITHEMS: return{...state,  ithems: action.payload}
        case DELETE_ITHEM: return{...state, ithems: state.ithems.filter(data => data.keyID !== action.payload)}
        case ADD_NEW_TAG: return{...state, tags: state.tags.concat(action.payload)}
        case READ_TEGS: return{...state, tags: action.payload}
        case DELECTE_TAG: return{...state, tags:state.tags.filter(data => data.keyID !== action.payload) }
        case CREATE_NAME_COLLECTIONS: return{...state , nameCollections: state.nameCollections.concat(action.payload)}
        case  READ_NAME_COLECTIONS: return{...state, nameCollections: action.payload}
        case SET_KEY_ITHEMS: return{...state, keyIdIthems: action.payload, search: []}
        case LIKED: return{...state, like:state.like.concat(action.payload)}
        case READ_LIKE: return{...state, like:action.payload}
        case DISLIKE: return{...state, like: state.like.filter(data => data.keyID !== action.payload)}
        case CREATE_COMENT: return{ ...state, comment: state.comment.concat(action.payload)}
        case READ_COMMENT: return{...state, comment: action.payload}
        case UPLOAD_PICTURES: return{...state, pictures: state.pictures.concat(action.payload)}
        case SEARCH_ITHEM: return{...state, search: state.ithems.filter(ithem =>{ {if(ithem.name.toString().toLowerCase().includes(action.payload.toLowerCase())){return ithem} } } )}
        case SEARCH_ITHEM_EMPTY: return{...state, search : [] }
        case CLOSE_SEARCH: return{...state, search: [] }
        default: return state;
    }
}