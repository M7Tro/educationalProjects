export default function GenderBox ({onCheck, selected}) {
    return (
        <div className="flex text-3xl w-full justify-center gap-4 m-3">
            <div className="form-control ml-3">
                <label className={`flex items-center gap-3 ${(selected==='male')?"selected":""}`}>
                    <span>Male</span>
                    <input type="checkbox" onChange={()=>{onCheck("male")}} checked={(selected==="male"?"checked":"")} className="checkbox checkbox-primary" />
                </label>
            </div>
            <div className="form-control">
                <label className={`flex items-center gap-3 ${(selected==="female")?"selected":""}`}>
                    <span>Female</span>
                    <input type="checkbox" onChange={()=>{onCheck("female")}} checked={(selected==="female")?"checked":""}  className="checkbox checkbox-primary" />
                </label>
            </div>
        </div>
    ) 
}