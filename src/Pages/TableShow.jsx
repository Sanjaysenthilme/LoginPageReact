import React from 'react'
import "./Table.css"
import { useEffect, useState } from "react"



const TableShow = () => {

  const [API, setAPI] = useState([]);
  const [newID, setnewID] = useState('')
  
  const [FormID, setFormID] = useState(null)
  const [FormName, setFormName] = useState('')
  const [FormCity, setFormCity] = useState('')
  const [FormState, setFormState] = useState('')
  const [FormEmail, setFormEmail] = useState('')

  useEffect(() => {
    GetApi();
  }, [])

  const GetApi = () => {
    fetch('https://631198c6f5cba498da81cc4b.mockapi.io/details/json')
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setAPI(result)
      })
  }
  
  const NewClick = (key) => {
    setnewID(key)
  }

  const EditOperation = () => {
    let show = API[newID]
    // console.log(key-1)
    setFormID(show.id)
    setFormName(show.name)
    setFormCity(show.address.City)
    setFormState(show.address.State)
    setFormEmail(show.email)
 }

  const formsubmitterUpdate = (e) => {
    e.preventDefault();
    console.log("Update is wrk")
    fetch(`https://631198c6f5cba498da81cc4b.mockapi.io/details/json/${FormID}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(
          {
            name: FormName,
            address: { City: FormCity, State: FormState },
            email: FormEmail
          })
      }).then((res) => {
        window.location.reload();
    })
  }

  

  const formsubmitterAdd = (e) => {
    e.preventDefault();
    // console.log("Update is wrk")
    fetch(`https://631198c6f5cba498da81cc4b.mockapi.io/details/json/${newID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(
          {
            name: FormName,
            address: { City: FormCity, State: FormState },
            email: FormEmail
          })
      }).then((res) => {
        window.location.reload();
    })
  }
 

  const DeleteOperation = (newID) => {

    let del = API[newID]
    console.log(del)
    fetch(`https://631198c6f5cba498da81cc4b.mockapi.io/details/json/${del.id}`, { method: "DELETE" })
      .then((result) => {
        result.json()
          .then((res) => {
            //console.log(res)
          })
      }).then((res) => {
        window.location.reload();
    })
  }
 

  return (
    <div className='header-div'>
      {/* <button onClick={GetApi()}>kk</button> */}
      <h1>TableShow</h1>
      <div className='container-fluid'>
        {/* ------------------------------Add Details------------------------------------------------- */}

        <div className='btn-div'>
          {/* <!-- Button trigger modal --> */}
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add
          </button>

          {/* <!-- Modal --> */}
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">


                  {/* ------------------ Add Form ----------------------- */}
                  <form className="form-contro row g-3 needs-validation" novalidate>

                    <div>
                      {/* <label className="form-lable">Name</label> */}

                      <input className="form-control"
                        id="validationDefaultUsername"
                        aria-describedby="inputGroupPrepend2"
                        type="text"
                        // value={FormName}
                        required
                        placeholder="Enter UserName"
                        onChange={(e) => setFormName(e.target.value)}
                      />
                      <div className="valid-feedback">
                        Looks good!
                      </div>
                    </div>

                    <div>
                      {/* <label className="form-lable">City</label> */}
                      <input className="form-control"
                        type="text"
                        // value={FormCity}
                        required="required"
                        placeholder="Enter City Name"
                        onChange={(e) => setFormCity(e.target.value)}
                      />
                    </div>

                    <div>
                      {/* <label className="form-lable">State</label> */}
                      <input className="form-control"
                        type="text"
                        // value={FormState}
                        required="required"
                        placeholder="Enter State Name"
                        onChange={(e) => setFormState(e.target.value)}
                      />
                    </div>
                    <div>
                      {/* <label className="form-lable">Email</label> */}
                      <input className="form-control"
                        type="text"
                        // value={FormEmail}
                        required="required"
                        placeholder="Enter Email Address"
                        onChange={(e) => setFormEmail(e.target.value)}
                      />
                    </div>
                    <div className='modal-footer'  >
                      <button type="button" class="btn btn-secondary " data-bs-dismiss="modal" >Close</button>
                      <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onClick={formsubmitterAdd}>Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------Table------------------------------------------------------- */}
        <table className="table table-striped table-bordered borderd-black table-hover ">
          <thead className="table table-dark table-bordered borderd-black">
            <tr  >
              <th scope='col' >ID</th>
              <th scope='col' >Name</th>
              <th scope='col' >City</th>
              <th scope='col' >State</th>
              <th scope='col' >Email</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>

          <tbody className="table table-bordered borderd-dark">
            {API.map((item, key) =>
              <tr key={key}>
                <th>{item.id}</th>
                <td>{item.name}</td>
                 <td>{item.address.City}</td> 
               <td>{item.address.State}</td> 
                <td>{item.email}</td>

                <td>
                  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel">Edit</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Do You Want to Edit This Details
                        </div>
                        <div className="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" onClick={() => EditOperation()}>Yes</button>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel2">Update</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          {/* -------------------------------Update Form--------------------------------------------------- */}
                          <form className="form-control">
                            <div>
                              <label className="form-lable">Name</label>

                              <input className="form-control"
                                id="validationDefaultUsername"
                                aria-describedby="inputGroupPrepend2"
                                type="text"
                                value={FormName}
                                required
                                placeholder="Enter UserName"
                                onChange={(e) => setFormName(e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="form-lable">City</label>
                              <input className="form-control"
                                type="text"
                                value={FormCity}
                                required="required"
                                placeholder="Enter City Name"
                                onChange={(e) => setFormCity(e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="form-lable">State</label>
                              <input className="form-control"
                                type="text"
                                value={FormState}
                                required="required"
                                placeholder="Enter State Name"
                                onChange={(e) => setFormState(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="form-lable">Email</label>
                              <input className="form-control"
                                type="text"
                                value={FormEmail}
                                required="required"
                                placeholder="Enter UserName"
                                onChange={(e) => setFormEmail(e.target.value)}
                              />
                            </div>
                            
                            <div className="modal-footer" >
                              <button type="button" className="btn btn-outline-primary mb-3 btn1" data-bs-dismiss="modal" onClick={formsubmitterUpdate}>Update</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-outline-primary btn1" data-bs-toggle="modal" href="#exampleModalToggle" role="button" onClick={() => NewClick(key)}>Edit</a>


                  {/* ----------------------------------------Delete function-------------------------------------------------------- */}
                  <button class="btn btn-outline-danger btn1" data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => NewClick(key)} >Delete</button>
                  {/* <!-- Modal --> */}
                  <div className="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel2">Modal title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Do You Want to Delete This Details
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => DeleteOperation(newID)} >Yes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>

    

    </div>
  )
}
export default TableShow;