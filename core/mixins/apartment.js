import { getNameRooms } from '../utils/tags'

export default {
  methods: {
    getApartmentName(rooms, isStudio, square, floor, allFloor) {
      return `${getNameRooms(rooms, isStudio)}, ${(+square).toFixed(
        1
      )} м², ${floor}/${allFloor} эт.`
    }
  }
}
