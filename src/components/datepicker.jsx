import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

//npm install react-datepicker

function Reactdatepicker() {
  const [selectesDate, setSelectedDate] = useState("");

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-10">
          <form className="row">
            <div className="row mb-4">
              <div className="col-sm-5">
                <DatePicker
                  selected={selectesDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  //minDate={ new Date()}
                  //maxDate={ new Date()}
                  //filterDate={ date=>date.getDay()!=6 && date.getDay()!=0}
                  // isClearable
                  showYearDropdown
                />
              </div>
            </div>

            <div className="row mb-4">
              <label className="col-sm-2 col-form-label"></label>
              <div className="col-sm-4">
                <Link to={`/schedule`}>
                  
                    <ul className="menu-list">
                      <li className="menu-list px-5">Create Schedule</li>
                    </ul>
                 
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Reactdatepicker;
