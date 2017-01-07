import React, { Component } from "react"
import {
  Row,
  Col,
  Well,
  Glyphicon,
  Popover,
  OverlayTrigger,
  Button,
  FormControl,
  InputGroup,
  FormGroup
} from "react-bootstrap"
import moment from "moment"
import { connect } from "react-redux"
import classnames from 'classnames'
import { fetchMany as fetchManyVehicles } from "../../modules/vehicles/actions"
import { getMany as getManyVehicles } from "../../modules/vehicles/selectors"
import {
  fetchMany as fetchManyDates,
  save as saveDate,
  nextInterval,
  previousInterval
} from "../../modules/dates/actions"
import { getMany as getManyDates } from "../../modules/dates/selectors"
import './Calendar.css'

export class Calendar extends Component {

  componentWillMount(){
    this.props.fetchManyVehicles()
    this.props.fetchManyDates()
  }

  handleNextInterval(){
    this.props.nextInterval()
    this.props.fetchManyDates()
  }

  handlePreviousInterval(){
    this.props.previousInterval()
    this.props.fetchManyDates()
  }

  renderDayOfWeek({ date }){
    const day = moment(date).day()
    const isWeekend = (day === 6) || (day === 0)

    return (
      <Col md={1}
           key={date}
           className={classnames('text-center', 'day-of-week', {'weekend': isWeekend})}>
        {moment(date).format('ddd')}
      </Col>
    );
  }

  renderDayOfMonth(entry){
    return (
      <Col md={1}
           key={entry.date}
           className="text-center day-of-month">
        {moment(entry.date).format('D')}
      </Col>
    );
  }

  renderMonthHeader(date){
    const formatMonth = (date) => date.format('MMMM YYYY')

    const firstEntryDate = moment(date[0].date)
    const lastEntryDate = moment(date[date.length-1].date)

    const firstEqualsLast = firstEntryDate.format('M') === lastEntryDate.format('M')

    return (
      <b>
        {formatMonth(firstEntryDate)}
        {firstEqualsLast || ` - ${formatMonth(lastEntryDate)}`}
      </b>
    )
  }


  renderVehicleInventory(vehicle, entry){
    const schedule = entry.schedules[vehicle.id]

    let triggerRef;
    let inputRef

    const handlePriceSubmit = () => {
      const data = {
        vehicle_id: vehicle.id,
        date: entry.date,
        inventory: inputRef.value,
      }

      this.props.saveDate(data)

      triggerRef.hide()
    }

    const popoverClick = (
      <Popover id="inventory-popup">
        <FormGroup>
          <InputGroup>
            <FormControl type="number"
                         min={0}
                         defaultValue={schedule.inventory}
                         inputRef={(ref) => inputRef = ref} />
            <Button componentClass={InputGroup.Button}
                    style={{fontSize: 14}}
                    onClick={handlePriceSubmit}>
              <Glyphicon glyph="ok" />
            </Button>
          </InputGroup>
        </FormGroup>
      </Popover>
    )

    return (
      <Col md={1} key={entry.date} className="text-center inventory-cel">
        <OverlayTrigger trigger="click"
                        placement="top"
                        rootClose
                        overlay={popoverClick}
                        ref={(ref) => triggerRef = ref}>
          <span className="pointer dashed">{schedule.inventory}</span>
        </OverlayTrigger>
      </Col>
    )
  }

  renderVehiclePrice(vehicle, entry){
    const schedule = entry.schedules[vehicle.id]

    let triggerRef;
    let inputRef

    const handlePriceSubmit = () => {
      const data = {
        vehicle_id: vehicle.id,
        date: entry.date,
        price: inputRef.value,
      }

      this.props.saveDate(data)

      triggerRef.hide()
    }

    const popoverClick = (
      <Popover id="price-popup">
        <FormGroup>
          <InputGroup>
            <FormControl type="number"
                         min={0}
                         defaultValue={schedule.price}
                         inputRef={(ref) => inputRef = ref} />
            <Button componentClass={InputGroup.Button}
                    style={{fontSize: 14}}
                    onClick={handlePriceSubmit}>
              <Glyphicon glyph="ok" />
            </Button>
          </InputGroup>
        </FormGroup>
      </Popover>
    )

    return (
      <Col md={1} key={entry.date} className="text-center price-cel">
        <OverlayTrigger trigger="click"
                        placement="top"
                        rootClose
                        overlay={popoverClick}
                        ref={(ref) => triggerRef = ref}>
          <span className="pointer dashed">{schedule.price}</span>
        </OverlayTrigger>
      </Col>
    )
  }

  renderVehicleRow(vehicle, date) {
    return (
      <div key={vehicle.id}>
        <Row className={classnames('vehicle-row', {'even': !(vehicle.id%2), 'odd': !!(vehicle.id%2)})}>
          <Col md={12}>
            <b>{vehicle.name}</b>
          </Col>
        </Row>
        <Row className="inventory-row">
          <Col md={2} className="inventory-label">
            Vehicles available
          </Col>

          <Col md={10} >
            {date.map((entry) => this.renderVehicleInventory(vehicle, entry))}
          </Col>
        </Row>
        <Row className="price-row">
          <Col md={2}  className="price-label">
            Price ({vehicle.currency})
          </Col>

          <Col md={10} >
            {date.map((entry) => this.renderVehiclePrice(vehicle, entry))}
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    const { vehicles, dates } = this.props

    return (
      <Well className="Calendar">
        <Row className="calendar-header">
          <Col mdOffset={3} md={9} className="text-center">

            <span id="previous-interval" onClick={(event) => this.handlePreviousInterval(event)} className="m-r-md pointer">
              <Glyphicon glyph="arrow-left" />
            </span>

            {(dates.length > 0) && this.renderMonthHeader(dates)}

            <span id="next-interval" onClick={(event) => this.handleNextInterval(event)} className="m-l-md pointer">
              <Glyphicon glyph="arrow-right" />
            </span>

          </Col>
        </Row>
        <Row>
          <Col md={2} >
            <b>Price and availability</b>
          </Col>

          <Col md={10} >
              <div>
                {dates.map((entry) => this.renderDayOfWeek(entry))}
              </div>
            <div>
              {dates.map((entry) => this.renderDayOfMonth(entry))}
            </div>
          </Col>
        </Row>
        {vehicles.map((vehicle) => this.renderVehicleRow(vehicle, dates))}
      </Well>
    );
  }
}

export default connect(
  (state) => ({
    vehicles: getManyVehicles(state),
    dates: getManyDates(state),
  }),
  {
    fetchManyVehicles,
    fetchManyDates,
    saveDate,
    nextInterval,
    previousInterval,
  }
)(Calendar)
