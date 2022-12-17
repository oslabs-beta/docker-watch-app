import React, { useEffect, useState } from 'react';

export default function Container({ id, text }) {

  return (
    <button className="btn btn-outline btn-accent min-w-full">{text}</button>
  )
}