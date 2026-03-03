import { faPlus, faUsers,  } from '@fortawesome/free-solid-svg-icons'
 export const taplink=[
   {maintitle:'المشرفين',link:'#',
    permission:'موارد بشرية',
     img:'Mask Group 75.png',   
    subtitle:[
        {link:'users',title:'الموظفين'}                           
                , {link:'adduser',title:'اضافة موظف'},               
                // {link:'Salaries',title:'المرتبات'},
        //   {link:'#',title:'نقل الموظفين'}
        ]           
   },
//    
   {maintitle:'إدارة المركبات',link:'#', permission:'إدارة المركبات',img:'Mask Group 78.png' ,   
    subtitle:[  {link:'AddVehicle',title:'إضافة مركبة' }, 
         {link:'FuelLogsPage',title:'سجل الوقود' },  
         {link:'About_vehicle',title:'استعلام عن مركبة' },  
        {link:'Vehicles',title:'العملاء'},         
        {link:'FuelSinceLastReward',title:'سجل تعبئات الزبون'},         
     //    {link:'CustomerFuelReward',title:'CustomerFuelReward'},         
        {link:'RewardsTable',title:'الجوائز غير المصروفة'},         
        {link:'AwardsDisbursed',title:'الجوائز المصروفة'},         
                       
   ]},

  
   {maintitle:'الإعدادات',permission:'الصلاحيات',  img:'Mask Group 83.png',   
    subtitle:[  
        {title: "الصلاحيات",link:'Role' },                 
   ]},

]
 
