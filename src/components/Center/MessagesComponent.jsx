import { BsPerson } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

function MessagesComponent() {
  return (
    <ul
      className="bg-slate-200 dark:bg-slate-900/70 rounded overflow-y-auto max-h-64"
    >
      <li
        className="flex items-center hover:bg-gray-300 dark:hover:bg-slate-700 p-2 transition-all rounded"  
      >
        <BsPerson className="ltr:mr-2 rtl:ml-2 text-green-300" />
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100">Your Patient</p> 
          <p className="text-gray-400 text-sm">
            Ali Connors
          </p>  
        </div>    
        <BiTimeFive className="text-gray-400 text-sm ltr:ml-auto rtl:mr-auto" />
      </li>
      <li
        className="flex items-center hover:bg-gray-300 dark:hover:bg-slate-700 p-2 transition-all rounded"  
      >
        <BsPerson className="ltr:mr-2 rtl:ml-2 text-green-300" />
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100 ">Your Patient</p> 
          <p className="text-gray-400 text-sm">
            Ali Connors
          </p>  
        </div>    
        <BiTimeFive className="text-gray-400 text-sm ltr:ml-auto rtl:mr-auto" />
      </li>
      <li
        className="flex items-center hover:bg-gray-300 dark:hover:bg-slate-700 p-2 transition-all rounded"  
      >
        <BsPerson className="ltr:mr-2 rtl:ml-2 text-green-300" />
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100 ">Your Patient</p> 
          <p className="text-gray-400 text-sm">
            Ali Connors
          </p>  
        </div>    
        <BiTimeFive className="text-gray-400 text-sm ltr:ml-auto rtl:mr-auto" />
      </li>
      <li
        className="flex items-center hover:bg-gray-300 dark:hover:bg-slate-700 p-2 transition-all rounded"  
      >
        <BsPerson className="ltr:mr-2 rtl:ml-2 text-green-300" />
        <div>
          <p className="font-medium text-slate-800 dark:text-slate-100 ">Your Patient</p> 
          <p className="text-gray-400 text-sm">
            Ali Connors
          </p>  
        </div>    
        <BiTimeFive className="text-gray-400 text-sm ltr:ml-auto rtl:mr-auto" />
      </li>

      {/* More list items... */}

    </ul>
  )
}

export default MessagesComponent