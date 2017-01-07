import React, { Component } from "react"
import {
  Row,
  Col,
  Well,
  Button,
  FormControl,
  Collapse,
  FormGroup,
  ControlLabel,
  Form,
  Checkbox
} from "react-bootstrap"
import DatePicker from 'react-bootstrap-date-picker'
import { connect } from "react-redux"
import { getMany as getManyVehicles } from "../../modules/vehicles/selectors"
import { bulkSave as bulkSaveDate } from "../../modules/dates/actions"
import './BulkEdit.css'

export class BulkEdit extends Component {

  constructor() {
    super()

    this.state = this.getDefaultState()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDatepickerChange = this.handleDatepickerChange.bind(this)
    this.handleRefineChange = this.handleRefineChange.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  getDefaultState(){
    return {
      vehicleId: '',
      from: '',
      to: '',
      refine: {
        all: false,
        mondays: false,
        thursdays: false,
        fridays: false,
        wednesdays: false,
        tuesdays: false,
        saturdays: false,
        sundays: false,
        weekdays: false,
        weekends: false,
      },
      price: 0,
      inventory: 0,
    }
  }

  handleCancel(){
    this.setState(this.getDefaultState())
  }

  handleSubmit(){
    const { vehicleId, from, to, price, inventory, refine } = this.state

    if(!vehicleId || !from || !to) return

    const data = {
      vehicle_id: vehicleId,
      from,
      to,
      price,
      inventory,
      refine: Object.keys(refine).filter((key) => refine[key])
    }

    this.props.bulkSaveDate(data)
    this.setState(this.getDefaultState())
  }

  handleInputChange({ target }) {
    this.setState((state) => ({ ...state, [target.name]: target.value }))
  }

  handleDatepickerChange(key){
    return (value) => {
      this.setState((state) => ({ ...state, [key]: value }))
    }
  }

  handleRefineChange({ target }){
    this.setState((state) => ({
      ...state,
      refine: {
        ...state.refine,
        [target.name]: target.checked
      }
    }))
  }

  renderRefineCheckbox(key, label){
    return (
      <Checkbox name={key}
                className="m-t-none"
                checked={this.state.refine[key]}
                onChange={this.handleRefineChange}>
        {label}
      </Checkbox>
    )
  }

  render() {
    const { vehicles } = this.props
    const { vehicleId, from, to } = this.state

    return (
      <Well className="BulkEdit">
        <Row>
          <Col md={12}>
            <h5 className="m-t-none pointer dashed"
                style={{display: 'inline'}}
                onClick={ ()=> this.setState((state) => ({ ...state, bulkEditOpen: !state.bulkEditOpen }))} >
              Bulk Operations
            </h5>
          </Col>
        </Row>

        <Collapse in={this.state.bulkEditOpen}>
          <div className="m-t-md">
            <Row>
              <Col md={12}>
                <Form inline>

                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Select Vehicle: </ControlLabel>
                    {' '}
                    <FormControl name="vehicleId"
                                 componentClass="select"
                                 value={this.state.vehicleId}
                                 onChange={this.handleInputChange}>
                      <option key={0} value={''}>-- // --</option>
                      {
                        vehicles.map((vehicle) =>
                          <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>)
                      }
                    </FormControl>
                  </FormGroup>

                </Form>
              </Col>
            </Row>

            <Row className="m-t-md">
              <Col md={2}>
                <ControlLabel>Select days: </ControlLabel>
              </Col>
              <Col md={10}>
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col md={4}>
                        <Row>
                          From:
                        </Row>
                      </Col>
                      <Col md={8}>
                        <DatePicker value={this.state.from}
                                    className="datepicker-radius"
                                    onChange={this.handleDatepickerChange('from')} />
                      </Col>
                    </Row>
                    <Row className="m-t-md">
                      <Col md={4}>
                        <Row>
                          To:
                        </Row>
                      </Col>
                      <Col md={8}>
                        <DatePicker value={this.state.to}
                                    className="datepicker-radius"
                                    onChange={this.handleDatepickerChange('to')} />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={8}>
                    <Row>
                      <Col md={3}>
                        <b>Refine days:</b>
                      </Col>
                      <Col md={9}>
                        <Row>
                          <Col md={3}>
                            {this.renderRefineCheckbox('all', 'All Days')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('mondays', 'Mondays')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('thursdays', 'Thursdays')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('sundays', 'Sundays')}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            {this.renderRefineCheckbox('weekdays', 'Weekdays')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('tuesdays', 'Tuesdays')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('fridays', 'Fridays')}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            {this.renderRefineCheckbox('weekends', 'Weekends')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('wednesdays', 'Wednesdays')}
                          </Col>
                          <Col md={3}>
                            {this.renderRefineCheckbox('saturdays', 'Saturdays')}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row className="m-t-md">
              <Col md={2}>
                <ControlLabel>Change price to: </ControlLabel>
              </Col>

              <Col md={2}>
                <Row>
                  <FormControl name="price"
                               type="number"
                               min={0}
                               value={this.state.price}
                               onChange={this.handleInputChange}/>
                </Row>
              </Col>
            </Row>

            <Row className="m-t-md">
              <Col md={2}>
                <ControlLabel>Change availability to: </ControlLabel>
              </Col>

              <Col md={2}>
                <Row>
                  <FormControl name="inventory"
                               type="number"
                               min={0}
                               value={this.state.inventory}
                               onChange={this.handleInputChange} />
                </Row>
              </Col>
            </Row>

            <Row className="m-t-lg">
              <Col md={12}>
                <Button onClick={this.handleCancel}>Cancel</Button>
                {' '}
                <Button id="bulkedit-submit"
                        bsStyle="success"
                        disabled={!vehicleId || !from || !to}
                        onClick={this.handleSubmit}>
                  Update
                </Button>
              </Col>
            </Row>
          </div>
        </Collapse>

      </Well>
    );
  }
}

export default connect(
  (state) => ({
    vehicles: getManyVehicles(state),
  }),
  {
    bulkSaveDate,
  }
)(BulkEdit)
