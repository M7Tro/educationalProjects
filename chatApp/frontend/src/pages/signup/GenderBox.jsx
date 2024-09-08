export default function GenderBox () {
    return (
        <div className="flex text-3xl w-full justify-center gap-4">
            <div className="form-control ml-3">
                <label className="flex items-center gap-3">
                    <span>Male</span>
                    <input type="checkbox" className="checkbox" />
                </label>
            </div>
            <div className="form-control">
                <label className="flex items-center gap-3">
                    <span>Female</span>
                    <input type="checkbox"  className="checkbox" />
                </label>
            </div>
        </div>
    )
}