import { formatNumber, ruFormat } from './numberFormat'
import { getNameRooms } from './tags'
import { getCoordsFromString } from './coords'
import { CURRENT_COLOR } from '../constants'
export class Apartment {
  _labelsParam = {
    complexName: 'Проект',
    houseAddress: 'Адрес',
    locationOnFloor: 'Этаж',
    square: 'Общая площадь',
    kitchenSpace: 'Площадь кухни',
    ceilingHeight: 'Высота потолков',
    decoration: 'Тип отделки'
  }

  constructor(info) {
    this.id = info.id
    this.price = ruFormat(info.price, { postfix: ' ₽' })
    this.pricePerSquare = ruFormat(info.price / info.square, {
      postfix: ' ₽ за м2'
    })
    this.minMortgage = ruFormat(info.minMortgage, { postfix: ' ₽/мес.' })
    this.floor = info.floor
    this.countFloors = info?.house?.countFloors
    this.locationOnFloor = this.floor + '/' + this.countFloors + ' этаж'
    this.rooms = info.rooms
    this.isStudio = info.isStudio
    this.square = info.square
      ? formatNumber(info.square, {
          fixed: true,
          precision: 2,
          postfix: ' м²'
        })
      : '-'
    this.image = info.layoutImage
    this.planImage = info.floorPlanImage
    this.url = info.url
    this.apartmentNumber = info.apartmentNumber || '-'
    this.viewFromWindows = info.viewFromWindows || '-'
    this.decoration = info.decoration || '-'
    this.kitchenSpace = +info.kitchenSpace
      ? formatNumber(info.kitchenSpace, {
          fixed: true,
          precision: 2,
          postfix: ' м²'
        })
      : '-'
    this.ceilingHeight = +info.ceilingHeight
      ? formatNumber(info.ceilingHeight, { precision: 1, postfix: ' м' })
      : '-'
    this.bookingStatus = info.bookingStatus || '-'
    // Complex
    this.complexName = info?.house?.complex?.name
    this.complexColor = info?.house?.complex?.color || CURRENT_COLOR
    this.complexTags = info?.house?.complex?.tags || []
    // House
    this.houseAddress = info.house?.address || '-'
    this.houseCoords = getCoordsFromString(info.house.coords)
    this.benefits = info?.house?.complex?.benefits || []
  }

  getWordsNumberOfRooms() {
    return getNameRooms(this.rooms, this.isStudio)
  }

  getParamsListByKey(params = []) {
    return params.map((el) => ({
      label: this._labelsParam[el],
      value: this[el]
    }))
  }
}
