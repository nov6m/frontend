export const bookingParkingById = `
query getParking($id: Int) {
  parkingSpacesByPk(pk: $id) {
    bookingStatus
    price
    number
    square
    house {
      address
      houseNumber
      complex {
        name
      }
    }
  }
}
`
