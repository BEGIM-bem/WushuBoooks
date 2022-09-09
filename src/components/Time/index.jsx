import React from "react";

import { formatDistance } from 'date-fns';
import ruLocale from "date-fns/locale/ru";
import { now } from "lodash";

const Time = ({ date }) =>
    <> {formatDistance(new Date(), date, { locale: ruLocale, addSuffix: true })} </ >



export default Time;