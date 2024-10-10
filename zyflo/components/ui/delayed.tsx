import React, { useState, useEffect } from "react"

type Props = {
  children: React.ReactNode
  waitBeforeShow?: number
}

const Delayed = ({
  children,
  waitBeforeShow = 500
}: Props): React.JSX.Element => {
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true)
    }, waitBeforeShow)
    return () => clearTimeout(timer)
  }, [waitBeforeShow])

  return isShown ? <>{children}</> : <></>
}

export default Delayed
