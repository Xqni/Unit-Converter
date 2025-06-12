// simple component to display the result only after use clicks on 'convert' button
const Result = ({ returnValue }) => {
  const toTitleCase = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() //function for title=casing

  return (
    <>
      <div className="result">
        <h3>Result</h3>
        <div>
          {returnValue.value} {toTitleCase(returnValue.toUnit)}
        </div>
      </div>
    </>
  )
}

export default Result