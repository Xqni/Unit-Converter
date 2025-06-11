const Result = ({ returnValue }) => {
  const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  return (
    <>
      <h3>Result</h3>
      <div>
        {returnValue.value} {toTitleCase(returnValue.toUnit)}
      </div>
    </>
  )
}

export default Result