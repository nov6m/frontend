import Api from '@/core/Api'
import apartment from '@/core/mixins/apartment'
import { bookingApartmentById, bookingParkingById } from '@/query'
import { isNumber } from '@/core/utils/type'
import { ruFormat } from '@/core/utils/numberFormat'

class Booking {
  info = null
  constructor(options) {
    this.type = options.type || 'apartment'
    this.id = options.id
  }
}
class Apartment extends Booking {
  async fetchInfo() {
    const { apartment } = await Api.graphQL(bookingApartmentById, {
      id: this.id
    })
    this.info = apartment
  }

  getTitle() {
    if (!this.info) {
      return '-'
    }
    const { rooms, isStudio, square, floor, house } = this.info
    return apartment.methods.getApartmentName(
      rooms,
      isStudio,
      square,
      floor,
      house?.countFloors
    )
  }

  getImage() {
    return this.info?.layoutImage
  }

  getPrice() {
    if (isNumber(+this.info.price)) {
      return ruFormat(this.info.price) + ' ₽'
    }
    return '-'
  }

  getBookingStatus() {
    return this.info?.bookingStatus === 'квартира забронирована'
      ? 'booked'
      : 'free'
  }
}
class Parking extends Booking {
  async fetchInfo() {
    const { parkingSpacesByPk } = await Api.graphQL(bookingParkingById, {
      id: this.id
    })
    this.info = parkingSpacesByPk
  }

  getTitle() {
    if (!this.info) {
      return '-'
    }
    return `Машиноместо, ${this.info.square} м², №${this.info.number}`
  }

  getImage() {
    return require('assets/img/parking-place.png')
  }

  getPrice() {
    if (isNumber(+this.info.price)) {
      return ruFormat(this.info.price) + ' ₽'
    }
    return '-'
  }

  getBookingStatus() {
    return this.info?.bookingStatus === 'A_2' ? 'booked' : 'free'
  }
}
export default class BookingFactory {
  createBooking(options) {
    if (options.type === 'parking') {
      return new Parking(options)
    } else {
      return new Apartment(options)
    }
  }
}
