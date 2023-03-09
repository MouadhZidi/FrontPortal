import { setAriaHidden } from 'ag-grid-community/dist/lib/utils/aria';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        link: '/dashboard',
     
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 8,
        label: 'Découvrir',
        isTitle: true
    },
    {
        id: 9,
        label: 'MENUITEMS.CALENDRIERCONGES.TEXT',
        icon: 'bx-calendar',
        link: '/calendar-conge/calendar-conge',
    },
    {
        id: 10,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: '/chat',

    },

    {
        id: 12,
        label: 'MENUITEMS.EMPLOYE.TEXT',
        icon: 'bx-store',
        subItems: [
            {
                id: 13,
                label: 'MENUITEMS.EMPLOYE.LIST.INFOPERS',
                link: '/employe/infopers',
                parentId: 12
            },
            {
                id: 14,
                label: 'MENUITEMS.EMPLOYE.LIST.INFOPROF',
                link: '/employe/infoprof',
                parentId: 12
            },
            {
                id: 15,
                label: 'MENUITEMS.EMPLOYE.LIST.INFOSOC',
                link: '/employe/infosoc',
                parentId: 12
            },
          


        ]
    },
    {
        id: 12,
        label: 'MENUITEMS.FICHEEVAL.TEXT',
        icon: 'bx-store',
        link: '/EspaceCollaborateur/evalcomp',


    },
    
    {
        id: 21,
        label: 'MENUITEMS.DEMANDE.TEXT',
        icon: 'bx bx-highlight',
        isRh:true,
        subItems: [
            {
                id: 22,
                label: 'MENUITEMS.DEMANDE.LIST.PRETAVANCE',
                link: '/demande/PretAvance',
                parentId: 21
            },
            {
                id: 23,
                label: 'MENUITEMS.DEMANDE.LIST.AUTORISATION',
                link: '/demande/Autorisation',
                parentId: 21
            },
            {
                id: 24,
                label: 'MENUITEMS.DEMANDE.LIST.CONGE',
                link: '/demande/Conge',
                parentId: 21
            },
            {
                id: 25,
                label: 'MENUITEMS.DEMANDE.LIST.SITUATION',
                link: '/demande/Situation',
                parentId: 21
            },
            {
                id: 26,
                label: 'MENUITEMS.DEMANDE.LIST.FORMATION',
                link: '/demande/Formation',
                parentId: 21
            },
            {
                id: 27,
                label: 'MENUITEMS.DEMANDE.LIST.DOCUMENT',
                link: '/demande/Document',
                parentId: 21
            },

        ]
    },
  
    {
        id: 36,
        label: 'MENUITEMS.CONSULTCONGE.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 37,
                label: 'MENUITEMS.CONSULTCONGE.LIST.SOLDE',
                link: '/conge/list',
                parentId: 36
            },
            {
                id: 38,
                label: 'MENUITEMS.CONSULTCONGE.TEXT',
                link: '/conge/solde',
                parentId: 36
            },
        ],

    },
    {
        id: 39,
        label: 'MENUITEMS.PAIE.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 40,
                label: 'MENUITEMS.PAIE.LIST.ETAT',

                parentId: 126,
                subItems: [
                    {
                        id: 1128,
                        label: 'MENUITEMS.PAIE.LIST.TEMPLATE.EDITION',
                        parentId: 40,
                        link : '/paie/bulletin-paie'
                    }
                 
                ]
            },
          

        ]
    },



    
    {

       
        id: 52,
        label: 'MENUITEMS.EVENEMENT.TEXT',
        icon: 'bx-file',
       
        subItems: [

            {
                id: 56,
                label: 'MENUITEMS.EVENEMENT.LIST.LISTEVENT',
                link: '/blog/getbyD',
                parentId: 52
            },
            {
                id: 54,
                label: 'MENUITEMS.EVENEMENT.LIST.HISTORIQUE',
                link: '/blog/grid',
                parentId: 52
            },
            {
                id: 55,
                label: 'MENUITEMS.EVENEMENT.LIST.CALENDRIER',
                link: '/blog/calendar',
                parentId: 52
            },

            

        ]
    },
    
    {
        id: 113,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.CHART.TEXT',
        
        badge: {
            variant: 'success',
          
        },
        isLayout:true,

        subItems: [
        
            {
                id: 115,
                label: 'MENUITEMS.CHART.LIST.CHART',
                link: '/charts/chartjs',
                parentId: 113
            },

        ]
    },
    

    {
            id: 125,
            label: 'MENUITEMS.BULTSOIN.LIST.CONSBULTSOIN',
            icon: 'bx-share-alt',
            subItems: [
                {
                    id: 126,
                    label: 'MENUITEMS.BULTSOIN.LIST.CONSBULTSOIN',
                    link: '/bsoin/bsoin',
                    parentId: 125
                },
               

            ]
        },
        
   
    {
            id: 126,
            label: 'MENUITEMS.AVPR.TEXT',
            icon: 'bx-wallet-alt',
            subItems: [
                {
                    id: 128,
                    label: 'MENUITEMS.AVPR.LIST.CONAVPR',
                    link: '/pret-avance/pret-avance',
                    parentId: 126
                },
                {
                    id: 129,
                    label: 'MENUITEMS.AVPR.LIST.CONSOPP',
                    link: '/opposition/consltoppo',
                    parentId: 126
                },
            

            ]
        },


       

        {
            id: 127,
            label: 'MENUITEMS.ESPACECHEF.TEXT',
            icon: 'bx bx-user-pin',
           
        badge: {
            variant: 'danger',
            text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
        },
            isLayout:true,
            subItems: [
                {
                    id: 129,
                    label: 'MENUITEMS.ESPACECHEF.LIST.CONSESPCHEF',
                    link: '/EspaceChef/Chef',
                    parentId: 127
                },


                {
                    id: 130,
                    label: 'MENUITEMS.ESPACECHEF.LIST.HISTCHEF',
                    link: '/EspaceChef/historique',
                    parentId: 127
                },
                {
                    id: 131,
                    label: 'MENUITEMS.ESPACECHEF.LIST.POINTAGE.TEXT',
                    icon: 'bx bx-time',
                    subItems: [
                        {
                            id: 128,
                            label: 'MENUITEMS.ESPACECHEF.LIST.POINTAGE.POINTAGEE.CONSPOINTAGE',
                            link: '/pointage/pointage',
                            parentId: 131
                        },
                        {
                            id: 129,
                            label: 'MENUITEMS.ESPACECHEF.LIST.POINTAGE.POINTAGEE.CONSRETARD',
                            link: '/pointage/retard',
                            parentId: 131
                        },
                        {
                            id: 130,
                            label: 'MENUITEMS.ESPACECHEF.LIST.POINTAGE.POINTAGEE.CONSAUTORISATION',
                            link: '/pointage/autorisation',
                            parentId: 131
                        },
                        {
                            id: 131,
                            label: 'MENUITEMS.ESPACECHEF.LIST.POINTAGE.POINTAGEE.CONSCONGE',
                            link: '/pointage/conge',
                            parentId: 131
                        }


                    ]
                },
                {
                    id: 132,
                    label: 'MENUITEMS.ESPACECHEF.LIST.COLLAB.TEXT',
                    icon: 'bx-store',
                    subItems: [
                        {
                            id: 201,
                            label: 'MENUITEMS.ESPACECHEF.LIST.COLLAB.COLABB.INFOPROF',
                            link: '/EspaceCollaborateur/infopers',
                            parentId: 13
                        },
                        {
                            id: 202,
                            label: 'MENUITEMS.ESPACECHEF.LIST.COLLAB.COLABB.INFOPERS',
                            link: '/EspaceCollaborateur/infoprof',
                            parentId: 13
                        },
                        {
                            id: 203,
                            label: 'MENUITEMS.ESPACECHEF.LIST.COLLAB.COLABB.INFOSOC',
                            link: '/EspaceCollaborateur/infosoc',
                            parentId: 13
                        },


                    ]
                },
                {
                    id: 133,
                    label: 'MENUITEMS.ESPACECHEF.LIST.CONSCONT',
                    link: '/contrat/contrat',
                    parentId: 127,
                    subItems: [
                        {
                            id: 130,
                            label: 'Echéance des contrats',
                            link: '/contrat/contrat',
                            parentId: 133
                        },
                        {
                            id: 130,
                            label: 'Calendrier des contrats',
                            link: '/contrat/calendrier-contrat',
                            parentId: 133
                        },
                    ]
                },
                {
                    id: 134,
                    label: 'MENUITEMS.ESPACECHEF.LIST.OBJ',
                    link: '/objectif/objectif',
                    parentId: 127
                },
                {
                    id: 135,
                    label: 'MENUITEMS.ESPACECHEF.LIST.COMPE',
                    link: '/competence/competence',
                    parentId: 127
                }
                // ,
                // {
                //     id: 136,
                //     label: 'MENUITEMS.ESPACECHEF.LIST.Eval',
                //     link: '/EspaceChef/evaluation',
                //     parentId: 127
                // },
               
            
                
            ]

        },
        {
            id: 128,
            label: 'MENUITEMS.ESPACERH.TEXT',
            icon: 'bx bx-user-pin',
            isRh:true,
            badge: {
                variant: 'info',
                text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
            },
            subItems: [
                {
                    id: 130,
                    label: 'MENUITEMS.ESPACERH.LIST.CONSRH',
                    link: '/EspaceRh/Rh',
                    parentId: 128
                },


                {
                    id: 131,
                    label: 'MENUITEMS.ESPACERH.LIST.CONSHISRH',
                    link: '/EspaceRh/historique',
                    parentId: 128
                },
                {
                    id: 132,
                    label: 'MENUITEMS.ESPACERH.LIST.CONSOPP',
                    link: '/opposition/consltoppoRh',
                    parentId: 128
                },
                {
                    id: 133,
                    label: 'MENUITEMS.ESPACERH.LIST.CONSCONGE',
                    link: '/conge/soldeRh',
                    parentId: 128
                },
                {
                    id: 133,
                    label: 'MENUITEMS.ESPACERH.LIST.CONSPAIE',
                    link: '/paie/bulletin-paie-Rh',
                    parentId: 128
                },
                {
                    id: 134,
                    label: 'MENUITEMS.ESPACERH.LIST.AJOUTEV',
                    link: '/blog/list',
                    parentId: 128
                },
                {
                    id: 135,
                    label: 'MENUITEMS.ESPACERH.LIST.COMPET',
                    link: '/competence/competence',
                    parentId: 128
                },
                {
                    id: 136,
                    label: 'MENUITEMS.ESPACERH.LIST.FICH',
                    link: '/Ajout/Agent',
                    parentId: 128
                },
                {
                    id: 137,
                    label: 'MENUITEMS.ESPACERH.LIST.EDITFICH',
                    link: '/Ajout/Modifer',
                    parentId: 128
                },
            ]
        },
        {
            id: 129,
            label: 'Espace Admin',
            icon: 'bx bx-user-pin',
            isAdmin:true,
            badge: {
                variant: 'warning',
                text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
            },
            subItems: [
                {
                    id: 134,
                    label: 'Espace admin',
                    link: '/Admin/admin',
                    parentId: 129
                },



            ]
        }
];

