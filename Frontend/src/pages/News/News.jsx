import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button, Table} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import $ from 'jquery'
import Layout from '../../layout/Layout';
import { API } from '../../App';
import Pagination from "rc-pagination";

const News = () => {
    const token = Cookies.get("fmljwt");
    const [LoopData, setLoopData] = useState([])
    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);
    const [loading, setloading] = useState(true)
    const GetData = async (req, res) => {
        const Result = await API.post("/get_news" , {} , {headers:{Authorization: `Bearer ${token}`}})
        setLoopData(Result.data.Data)
        setloading(false)
    }

    // Paggintion Code //
  const getData1 = (current, pageSize) => {
    return LoopData.slice((current - 1) * pageSize, current * pageSize);
  };

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(LoopData.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const paginationData = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (current, type, originalElement) => {
    if (type === "prev") {
      return <button className="paggination-btn">Previous</button>;
    }
    if (type === "next") {
      return <button className="paggination-btn">Next</button>;
    }
    return originalElement;
  };

  let count = 10
  let swalCountdownInterval
  const DeleteData = async (id) => {
      const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
              confirmButton: "btn btn-danger btn-lg counter",
              cancelButton: "btn btn-primary btn-lg me-3",
          },
          buttonsStyling: false,
      });

      swalWithBootstrapButtons
          .fire({
              title: "Are you sure you want to delete?",
              text: "You won't be able to revert this!",
              imageUrl: '../../icon/alert.svg',
              imageWidth: 80,
              imageHeight: 80,
              confirmButtonText: "OK (10)",
              cancelButtonText: "Cancel",
              showCancelButton: true,
              reverseButtons: true,
              didOpen: () => {
                  $(".swal2-confirm").attr('disabled', true);
                  swalCountdownInterval = setInterval(function () {
                      count--
                      if (count < 1) {
                          $(".counter").text(`OK`)
                          $(".swal2-confirm").attr('disabled', false);
                          clearInterval(swalCountdownInterval)
                      } else {
                          $(".counter").text(`OK (${count})`)
                      }
                  }, 1000);
              }
          })
          .then(async (result) => {
              if (result.isConfirmed) {
                  const form = new FormData()
                  form.append('id', id)
                  await API.post(`/delete_news`, form, { headers: { Authorization: `Bearer ${token}` } });
                  GetData();
              } else {
                  count = 10
                  clearInterval(swalCountdownInterval)
              }
          });
  };

  useEffect(() => {
    GetData()
}, [])

    return (
        <Layout sidebar={true}>
      <div className="page-heading">
        <h3 className="my-1">News</h3>
        <div className="page-heading-right">
          <Link to="/Add/news" className="my-1 ms-3">
            <Button variant="primary" value="create">Add New</Button>
          </Link>

        </div>
      </div>
      <div className="page-content">
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th width="5%" className='text-center'>No</th>
                      <th width="75%">Name</th>
                      <th width="10%">Preview</th>
                      <th width="10%" className='text-center'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      getData1(current, size).map((val, i) => {
                        return (
                          <tr>
                            <td className='text-center'>{(current === 1) ? i + 1 : current * size + i + 1 - size}</td>
                            <td>{val.news_headline_id.title}</td>
                            <td>
                            <Link to={`/view/news/${val._id}`}>
                                <Button variant="outline-warning" size="sm" className="">Preview</Button>
                              </Link>
                            </td>
                            <td className='text-center'>
                             <Button variant="outline-danger" onClick={() => DeleteData(val._id)} size="sm" className="btn-icon"><i className='bx bx-trash-alt' ></i></Button> 
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                  {
                   loading == false && LoopData.length === 0 ? <tr>
                      <td colSpan="100%" className="p-0">
                        <div className='no-found'>
                          <img src="../../not-found/image.svg" />
                          <p>No Found Remotes</p>
                        </div>
                      </td>
                    </tr> : ""

                  }
                </Table>
                {LoopData.length > size ? (
                  <div className="pagination-custom">
                    <Pagination
                      showTitle={false}
                      className="pagination-data"
                      onChange={paginationData}
                      total={LoopData.length}
                      current={current}
                      pageSize={size}
                      showSizeChanger={false}
                      itemRender={PrevNextArrow}
                      onShowSizeChange={PerPageChange}
                    />
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
    )
}

export default News