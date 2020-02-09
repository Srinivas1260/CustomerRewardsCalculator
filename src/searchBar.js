import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Select from 'react-select';
import { mapKeys, isObject } from 'lodash';
import styled from 'styled-components';
import {Months} from './helper';
const SearchBarStyle = styled.div`

    padding : 1.5em;
    button {
        padding: 7px;
        margin-top: 20px;
        margin-left: 20px;
    }
`;
function SearchBar(props) {

    const [customerId, setCustomerId] = useState(null);
    const [year,setYear] = useState(null);
    const [month,setMonth] = useState(null);

    const filters = props.filters;
    const customers = [];
    const years = [];
    const months = [];
    mapKeys(filters, (value, key) => {
        if (customerId && customerId == key) {
            mapKeys(value, (value_customer_year, key_customer_year) => {
                if (isObject(value_customer_year)) {
                    years.push({
                        label: key_customer_year,
                        value: key_customer_year
                    });
                    if(key_customer_year == year){
                        mapKeys(value_customer_year, (value_customer_Month, key_customer_Month)=>{
                            months.push({
                                ...Months[key_customer_Month],
                                value : key_customer_Month
                            });
                        });
                    }
                }
            });
        }
        customers.push({
            value: key,
            label: value.name
        });

    })
    return (
        <SearchBarStyle>
            <Row start="xs">
                <Col xs={2}>
                    <label>
                        Customer
                    <Select
                            label={"Input Field"}
                            options={customers}
                            onChange={(customerObj) => {
                                setCustomerId(customerObj.value);
                            }}
                        />
                    </label>
                </Col>
                <Col xs={2}  >
                    <label>
                        Year
                    <Select
                            label={"Input Field"}
                            options={years}
                            onChange={(customerObj) => {
                                setYear(customerObj.value);
                            }}
                        />
                    </label>
                </Col>
                <Col xs={2}>
                    <label>
                        Month
                    <Select
                            label={"Input Field"}
                            options={months}
                            onChange={(customerObj) => {
                                setMonth(customerObj.value);
                            }}
                        />
                    </label>
                </Col>
                <Col xs={2}>
                    <button
                        onClick={() => {
                            props.handleApplyFilters({
                                customerId,
                                year,
                                month
                            });
                        }}
                    > Submit </button>
                </Col>
            </Row>
        </SearchBarStyle>
    );
}
export default SearchBar;