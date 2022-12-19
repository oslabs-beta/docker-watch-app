import React, { useEffect, useState } from 'react';

export default function Container({ id, value }) {
  return (
    <button className="btn btn-outline btn-accent min-w-full">{value}</button>
  )
}