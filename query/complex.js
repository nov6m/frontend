export const complexBannerInfoQuery = `
query getComplexBannerInfo($id: Int) {
  complex(pk:$id){
      name
      subName
      tags
      countApartments
      minPrice
      sliders {
        id
        image
      }
  }
}
`
export const complexNameQuery = `
query getComplexName($id: Int) {
  complex(pk:$id){
      name
  }
}
`
export const complexParkingQuery = `
query getComplexName($id: Int) {
  complex(pk:$id){
    hasParking
  }
}
`
export const complexAboutInfoQuery = `
query getComplexAboutInfo($id: Int) {
  complex(pk:$id){
      imageAbout
      about
      videoUrl
  }
}
`
export const complexGalleryQuery = `
query getComplexBannerInfo($id: Int) {
  complex(pk:$id){
      gallery {
        id
        image
      }
  }
}
`
export const complexStepBuildingQuery = `
query getComplexStepBuilding($id: Int) {
  complex(pk:$id){
      progress {
        id
        image
        date
      }
  }
}
`
export const complexMenuItemsQuery = `
{
  allComplex {
      id
      name
      image
      street
      menuImage
      url
      saleOffice {
        address
      }
  }
}
`
export const complexFilesQuery = `
query getComplexFiles($id: Int) {
  complex(pk:$id){
      files {
        id
        file
        name
        size
      }
  }
}
`
export const complexInfrastructuresQuery = `
query getInfrastructures($id: Int) {
  complex(pk:$id){
      infrastructures {
        id
        name
        layout
        step
        imageOffset
        imageSize
        length
        address
        coords
        group {
          name
        }
      }
  }
  allInfrastructureGroups(complexPk: $id) {
    name
    image
    color
    count
  }
}
`
export const complexListQuery = `
query getComplexList($limit: Int, $exclude: [Int]) {
  allComplex(limit: $limit, excludePk: $exclude) {
    id
    name
    menuImage
    tags
    image
    street
    countApartments
    minPrice
    url
  }
}
`
export const complexHousesMapQuery = `
query getComplexList($id: Int) {
  complex(pk:$id) {
    id
    name
    imageMapHouses
    houses {
      id
      coords
      address
      complexPointPosition
      publicationStatus
      deliveryDate
      countApartments
      houseNumber
    }
  }
}
`
export const acquisitionMethodsComplexQuery = `
query getAcquisitionMethods($id: Int) {
  complex(pk:$id) {
    acquisitionMethods {
      name
      otherText
      image
      feedbackForm {
        name
        subName
        btnText
        code
      }
    }
  }
}
`
export const complexesOfficeQuery = `
{
  allComplex {
    id
    name
    saleOffice {
      phone
      address
      coords
      iconMap
      workTime
      image
    }
  }
}
`
export const mapObjectsQuery = `
{
  allComplex {
    id
    name
    mapIcon
    houses {
      id
      coords
      address
      deliveryDate
      apartmentCount
      houseNumber
    }
  }
}
`
