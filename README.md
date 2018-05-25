# wechat-mp-types
微信小程序 DefinitelyTyped.

# Install

```
npm i wechat-mp-types --save-dev
```

# How to Use

## add this module in your tsconfig.json

```json
{
	"compilerOptions": {
		"types": [
			"wechat-mp-types"
		]
	}
}
```

## use wx freely

```ts
getCurrentPages().forEach((page)=>{
	page.setData([]);
});
```
