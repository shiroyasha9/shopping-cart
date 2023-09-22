package com.shoppingcart;

import static com.shoppingcart.WifiScanResultsMapper.mapWifiScanResults;

import android.content.Context;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.shoppingcart.errors.ConnectErrorCodes;
import com.shoppingcart.errors.LoadWifiListErrorCodes;
import com.shoppingcart.utils.LocationUtils;
import com.shoppingcart.utils.PermissionUtils;

import java.util.List;

public class WifiModule extends ReactContextBaseJavaModule {
    private final WifiManager wifi;
    private final ReactApplicationContext context;

    WifiModule(ReactApplicationContext context) {
        super(context);

        // TODO: get when needed
        wifi = (WifiManager) context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        this.context = context;
    }

    @Override
    @NonNull
    public String getName() {
        return "WifiManager";
    }

    private boolean assertLocationPermissionGranted(final Promise promise) {
        final boolean locationPermissionGranted = PermissionUtils.isLocationPermissionGranted(context);
        if (!locationPermissionGranted) {
            promise.reject(ConnectErrorCodes.locationPermissionMissing.toString(), "Location permission (ACCESS_FINE_LOCATION) is not granted");
            return false;
        }

        final boolean isLocationOn = LocationUtils.isLocationOn(context);
        if (!isLocationOn) {
            promise.reject(ConnectErrorCodes.locationServicesOff.toString(), "Location service is turned off");
            return false;
        }

        return true;
    }

    /**
     * Returns a list of nearby WiFI networks.
     */
    @ReactMethod
    public void loadWifiList(final Promise promise) {
        if(!assertLocationPermissionGranted(promise)){
            return;
        }

        try {
            final List<ScanResult> scanResults = wifi.getScanResults();
            final WritableArray results = mapWifiScanResults(scanResults);
            promise.resolve(results);
        } catch (final Exception exception) {
            promise.reject(LoadWifiListErrorCodes.exception.toString(), exception.getMessage());
        }
    }
}