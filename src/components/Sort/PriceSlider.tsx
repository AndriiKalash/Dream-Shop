import {
  Grid,
  InputAdornment,
  Slider,
  styled,
} from "@mui/material";
import MuiInput from "@mui/material/Input";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { filterSelector, setPriceValue } from "../../redux/filters/slice";
import useDebounce from "../../hooks/useDebounce";

const Input = styled(MuiInput)`
  width: 63px;
`;

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#9c27b0",
  height: 3,
  padding: "13px 0",
  "& .MuiSlider-thumb": {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 3,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#bfbfbf" : "#d8d8d8",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 3,
  },
}));
// -------------------


export const PriceSlider:React.FC = () => {

  const minDistance = useRef(10);
  const {priceValue} = useAppSelector(filterSelector);
  const dispatch = useAppDispatch();
  // const delaySearch = useDebounce(value, 1000);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(setPriceValue([
        Math.min(newValue[0], priceValue[1] - minDistance.current),
        priceValue[1],
      ]));
    } else {
      dispatch(setPriceValue([
        priceValue[0],
        Math.max(newValue[1], priceValue[0] + minDistance.current),
      ]));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value: inputValue } = event.target;
    if (!Array.isArray(priceValue)) {
      return;
    }
    if (id === "min") {
      const updatedValue = [
        Number(inputValue),
        Math.max(Number(inputValue) + minDistance.current, priceValue[1]),
      ];
      dispatch(setPriceValue(updatedValue));
    } else {
      const updatedValue = [
        Math.min(Number(inputValue) - minDistance.current, priceValue[0]),
        Number(inputValue),
      ];
      dispatch(setPriceValue(updatedValue));
    }
  };

  const handleBlur = () => {
    if (Array.isArray(priceValue)) {
      let [minValue, maxValue] = priceValue;
      if (minValue < 0) {
        minValue = 0;
      } else if (minValue > 90) {
        minValue = 90;
      }
      if (maxValue < 10) {
        maxValue = 10;
      } else if (maxValue > 100) {
        maxValue = 100;
      }
      dispatch(setPriceValue([minValue, maxValue]));
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" style={{ marginTop: 0 }}>
      <Grid item>
        <Input
          value={priceValue[0]}
          size="small"
          color="secondary"
          id="min"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 5,
            min: 0,
            max: 90,
            type: "number",
          }}
        />
      </Grid>
      <Grid item xs>
        <AirbnbSlider
          getAriaLabel={(index) =>
            index === 0 ? "Minimum price" : "Maximum price"
          }
          value={priceValue}
          onChange={handleChange}
        />
      </Grid>
      <Grid item>
        <Input
          value={priceValue[1]}
          size="small"
          color="secondary"
          id="max"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            step: 5,
            min: 10,
            max: 100,
            type: "number",
          }}
        />
      </Grid>
    </Grid>
  );
};
