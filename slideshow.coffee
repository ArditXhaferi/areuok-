window.DEMO = window.DEMO || {}

Utils = {
  'transform':
    Modernizr.prefixed('transform').replace(/([A-Z])/g, (str,m1) => 
      return '-' + m1.toLowerCase()
    ).replace(/^ms-/,'-ms-')
  ,
  'translate': (x, y) =>
    tran = if Modernizr.csstransforms3d then 'translate3d' else 'translate'
    vals = if Modernizr.csstransforms3d then '(' + x + ', ' + y + ', 0)' else '(' + x + ', ' + y + ')'
    return tran + vals
}

class Application

  constructor: ->
    DEMO.utils = Utils
    @$doc = $(document)
    @$roller = $('.roller')
    @$step = $('#steps li')
    @$title = $('#titles li')
    @min = 0
    @max = @$step.length - 1
    @active_index = 0
    
    @$step.eq(@active_index).addClass('active')
    @$title.eq(@active_index).addClass('active')
    
    @observe()
  
  observe: ->
    @$doc.on('keyup', @onKeyup)
    
  onKeyup: (e) =>
    kc = e.keyCode
    
    if kc is 38
      e.preventDefault()
      @previous()
    if kc is 40
      e.preventDefault()
      @next()
  
  previous: =>
    if @active_index > @min
      @active_index--
      @update()
  
  next: =>
    if @active_index < @max
      @active_index++
      @update()
  
  update: =>
    y = -(@active_index * 100)
    @$roller.css(DEMO.utils.transform, DEMO.utils.translate(0,"#{y}%"))
    
    @$step.removeClass('active')
    @$title.removeClass('active')
    
    @$step.eq(@active_index).addClass('active')
    @$title.eq(@active_index).addClass('active')

$ ->
  DEMO.instance = new Application()