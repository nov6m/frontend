export const houseMapQuery = `
query getHouseMap($id: Int) {
  house(pk: $id) {
    coords
  }
}
`
export const allCompletedProjectsQuery = `
query getCompletedProjects($group: String, $orderBy: String) {
  allCompletedProjects(group: $group, orderBy: $orderBy) {
    completedDate
    photoText
    content
    address
    complex {
      name
    }
    image
  }
}
`
