import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar, TextInput
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { authenticate } from 'slices/app.slice'
import { useSelector, useDispatch } from 'react-redux'
import config from '../../../config.js';

const Login = ({ route, navigation }) => {
  const { loggedIn, sessionID } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [sessionId, setSessionId] = useState('')

  const getSessionId = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(config.API_URL + "/auth/login", requestOptions)
      .then(response => response.text())
      .then(response => JSON.parse(response))
      .then(response => processSessionId(response))
      .catch(error => console.log('error', error));
  }

  const processSessionId = async (cookie) => {
    cookie = cookie.response
    cookie.map(i => {
      let splitted = i.split(';')
      splitted.map(item => {
        let splitItem = item.split('=')
        if (splitItem[0] === 'ASP.NET_SessionId') {
          setSessionId(splitItem[1]);
          if (splitItem[1]) {
            logIn(splitItem[1])
          }
        }
      })
    });
  }

  const logIn = (sess) => {
    var myHeaders = new Headers();
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Cache-Control", "max-age=0");
    myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Linux\"");
    myHeaders.append("Upgrade-Insecure-Requests", "1");
    myHeaders.append("Origin", "https://mobilogr.uludag.edu.tr");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36");
    myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("Sec-Fetch-Mode", "navigate");
    myHeaders.append("Sec-Fetch-User", "?1");
    myHeaders.append("Sec-Fetch-Dest", "document");
    myHeaders.append("Referer", "https://mobilogr.uludag.edu.tr/Login.aspx");
    myHeaders.append("Accept-Language", "en-US,en;q=0.9,tr;q=0.8");
    myHeaders.append("Cookie", `ASP.NET_SessionId=${sess}; __AntiXsrfToken=ef3a390ca1cf4e30ac6eb357f31ddb3c; BIGipServerogr=1342248108.20480.0000`);

    var urlencoded = new URLSearchParams();
    urlencoded.append("__VIEWSTATE", "maYT/ypRudsA9X/9a0/aq62yuwZqQ92hCkVQ/QU4Mkol4wK99FuqErSXq4Dog1xooN8OzZAUyQBl9nj1mq0Ah6+zLN7cxFZr+Pnt9MDhdk/Fq2uD3ysTf3lVhk4ZYrprAMtBQUgTeRlhLNKj+qEfcAiW/Z5kSG/qZ4Wnl2mpXpL3Ixh+ZetM5XYufeT4frUb+pm8JA==");
    urlencoded.append("__EVENTVALIDATION", "ZyFRPqmPubc9U75tqijDaQ3RbvU86YKR8N5ny6jfeVbbeFHEudQkvMGTBuWddj2ZUdQQqJhy5noJD9394vybZPRDGXjZfM+e/z378yW2HxB9ZpDibPqI5NaUYk698ZXzRcvTkHgJOdsdNgO6UWgiqRL2BWs=");
    urlencoded.append("ctl00$ContentPlaceHolder1$txtKullaniciAdi", "031890006");
    urlencoded.append("ctl00$ContentPlaceHolder1$txtSifre", "Mnz14341");
    urlencoded.append("ctl00$ContentPlaceHolder1$btnLogin", "Giriş");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://mobilogr.uludag.edu.tr/Login.aspx", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result.includes('DUYURULAR')) {
          console.log('asdf');
          console.log('asdf');
          console.log('asdf');
          dispatch(authenticate({ loggedIn: true, checked: true, sessionID: sess }))
        } else {
          console.log('asdf');
          dispatch(authenticate({ loggedIn: false, checked: true, sessionID: null }))
        }
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getSessionId()
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setMail}
        value={mail}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="useless placeholder"
      />

      <Button
        title="Go Back"
        color="white"
        backgroundColor={colors.pink}
        onPress={navigation.goBack}
      />
    </View>
  )
}

Login.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Login.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrayPurple,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

export default Login
