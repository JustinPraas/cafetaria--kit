package nl.praas.cafetariasolution.fp.cms.utils;

import nl.praas.cafetariasolution.fp.cms.CmsConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class CurrencyUtils {

    private static final NumberFormat EU_NUMBER_FORMAT = NumberFormat.getCurrencyInstance(CmsConstants.SYSTEM_LOCALE);
    public static final String REGEX_DOT_SEPARATED_DECIMALS = "^[+-]?(\\d*|\\d{1,3}(,\\d{3})*)(\\.\\d+)?\\b$";
    public static final String REGEX_COMMA_SEPARATED_DECIMALS = "^[+-]?(\\d*|\\d{1,3}(\\.\\d{3})*)(,\\d+)?\\b$";

    static {
        EU_NUMBER_FORMAT.setMinimumFractionDigits(2);
        EU_NUMBER_FORMAT.setMaximumFractionDigits(2);
    }

    public static String priceToString(BigDecimal price) {
        if (price == null) {
            return "";
        }

        String priceString = price.setScale(2, RoundingMode.HALF_EVEN).toString();
        if (CmsConstants.COMMA_SEPARATED_CURRENCY_DECIMALS) {
            return priceString.replace(".", ",");
        } else {
            return priceString;
        }
    }

    public static BigDecimal parse(final String amount) {
        if (amount == null || amount.trim().isEmpty()) {
            return null;
        }

        String amountToParse = "" + amount.trim();

        if (CmsConstants.COMMA_SEPARATED_CURRENCY_DECIMALS) {
            if (!amount.matches(REGEX_COMMA_SEPARATED_DECIMALS)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De representatie van het geldbedrag voldoet niet aan de eisen");
            }
            amountToParse = convertToDotsSeparatedAmount(amountToParse);
        } else {
            if (!amount.matches(REGEX_DOT_SEPARATED_DECIMALS)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De representatie van het geldbedrag voldoet niet aan de eisen");
            }
        }

        final NumberFormat format = NumberFormat.getNumberInstance(Locale.US);
        if (format instanceof DecimalFormat) {
            ((DecimalFormat) format).setParseBigDecimal(true);
        }
        try {
            return (BigDecimal) format.parse(amountToParse);
        } catch (ParseException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "De gegeven prijs is ongeldig");
        }
    }

    private static String convertToDotsSeparatedAmount(String amountToParse) {
        StringBuilder result = new StringBuilder();
        for (char c : amountToParse.toCharArray()) {
            if (c == '.') {
                result.append(',');
            } else if (c == ',') {
                result.append('.');
            } else {
                result.append(c);
            }
        }
        return result.toString();
    }

}
