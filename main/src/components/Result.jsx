const Result = ({ returnValue }) => {
  return (
    <>
      <h3>Result</h3>
      <div>
        {returnValue.value} {returnValue.toUnit}
      </div>
    </>
  )
}

export default Result