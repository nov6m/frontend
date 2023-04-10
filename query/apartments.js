export const apartmentsListByComplexQuery = `
query getApartmentListByComplex($id: Int, $excludePk: [Int]) {
  popularApartmentByComplex(complexId: $id, excludePk: $excludePk) {
    id
    price
    floor
    rooms
    square
    layoutImage
    minMortgage
    isStudio
    url
    layoutImage
    house {
      countFloors
      complex {
        name
        color
      }
    }
  }
}
`
export const similarApartmentsQuery = `
query getApartmentListByComplex($id: Int, $excludePk: [Int]) {
  similarApartments(apartmentId: $id, excludePk: $excludePk) {
    id
    price
    floor
    rooms
    square
    layoutImage
    minMortgage
    isStudio
    url
    layoutImage
    house {
      countFloors
      complex {
        name
        color
      }
    }
  }
}
`
export const bookingApartmentById = `
query getApartment($id: Int) {
  apartment(pk: $id) {
    id
    price
    floor
    rooms
    isStudio
    apartmentNumber
    square
    layoutImage
    bookingStatus
    house {
      address
      countFloors
    }
  }
}
`
